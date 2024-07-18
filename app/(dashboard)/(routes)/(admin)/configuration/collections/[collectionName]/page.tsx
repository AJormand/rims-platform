"use client"
import { useEffect, useState } from "react"

import { SideNav } from "@/components/side-nav";
import { Section } from "@/components/section";

import { BasicDetailsForm } from "../_components/basic-details-form";
import axios from "axios";

export default function Collection({params}: {params: {collectionName: string}}) {
    const [collectionData, setCollectionData] = useState<any>(null);
    const {collectionName} = params

    const getListData = async () => {
        const response = await axios.get(`/api/collections/${collectionName}`);
        console.log(response.data)
        setCollectionData(response.data);

        const modelRegex = new RegExp(`model Product2Substance \\{([^\\}]*)\\}`, 's');
        const match = response.data.match(modelRegex);

        if (match) {
        const modelBody = match[1].trim();
        const fields = modelBody.split('\n').map(field => field.trim()).filter(field => field.length > 0);

        const parsedFields = fields.map(field => {
            const fieldComponents = field.split(/\s+/);
            return fieldComponents;
        });

        console.log(parsedFields);
        }
    }

    useEffect(()=> {
        getListData()
    })

    const sideNavSections = [{ name: "Basic Details", count: 0 }];

    return (
        <div className="flex w-full h-screen-minus-navbar-topbar">
            <SideNav sections={sideNavSections} />
    
            {collectionData && (
            <div className="w-full px-6 overflow-scroll">
                <div className="flex border-b-2 py-2 rounded-lg bg-slate-50">
                </div>
                <Section name="Basic Details" isExpanded={true}>
                <BasicDetailsForm data={collectionData} type="edit" />
                </Section>
            </div>
            )}
        </div>
    )
}