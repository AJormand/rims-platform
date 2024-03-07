import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Country } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: { applicationId: string } }
) {
  const { applicationId } = params;

  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  try {
    // Retrieve the application by its id
    const application = await db.application.findUnique({
      where: {
        id: applicationId,
      },
      include: {
        countries: true, // Include the associated countries
      },
    });
    if (!application)
      return new NextResponse("Application not found", { status: 404 });

    // Parse country data from the request body
    const countryData = await request.json();
    console.log(countryData);

    // Associate each country with the application
    await Promise.all(
      countryData.map(async (country: Country) => {
        // Check if the country is already associated with the application
        const isAssociated = application.countries.some(
          (appCountry) => appCountry.id === country.id
        );
        if (!isAssociated) {
          // Associate the country with the application
          await db.application.update({
            where: {
              id: applicationId,
            },
            data: {
              countries: {
                connect: {
                  id: country.id,
                },
              },
            },
          });
        }
      })
    );

    return new NextResponse("Countries added to the application", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("[POST APPLICATION]", { status: 400 });
  }
}

//Need to be fixed!!!!
export async function DELETE(
  request: Request,
  { params }: { params: { applicationId: string } }
) {
  const { applicationId } = params;
  const { countryId } = await request.json();
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const application = await db.application.findUnique({
      where: {
        id: applicationId,
      },
      include: {
        countries: true,
      },
    });

    if (!application)
      return new NextResponse("Application not found", { status: 404 });

    const countryToRemove = application.countries.find(
      (country: Country) => country.id === countryId
    );

    if (!countryToRemove) {
      return new NextResponse("Country not associated with the application", {
        status: 404,
      });
    }

    // Update the application to remove the specified country
    await db.application.update({
      where: {
        id: applicationId,
      },
      data: {
        countries: {
          disconnect: [{ id: countryToRemove.id }],
        },
      },
    });

    return new NextResponse("Country removed from the application", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("[DELETE COUNTRY]", { status: 400 });
  }
}
