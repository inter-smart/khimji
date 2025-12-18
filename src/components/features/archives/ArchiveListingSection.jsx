"use client";

import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, MapPin, Link2 } from "lucide-react";

const archiveData = [
    {
        id: 1,
        category: "corporate",
        categoryLabel: "Corporate",
        title: "20 Years Service Awards",
        date: "20 July 2025",
        location: "Muscat, Oman",
        image: "/images/archive/1.jpg",
        link: "https://youtu.be/GTAe3KgLEuU",
    },
    {
        id: 2,
        category: "brand",
        categoryLabel: "Brand",
        title: "Brand Excellence Meet",
        date: "18 July 2025",
        location: "Dubai, UAE",
        image: "/images/archive/2.jpg",
        link: "https://youtu.be/GTAe3KgLEuU",
    },
    {
        id: 3,
        category: "logistics",
        categoryLabel: "Logistics",
        title: "Logistics Hub Visit",
        date: "10 July 2025",
        location: "Muscat, Oman",
        image: "/images/archive/3.jpg",
        link: "https://youtu.be/GTAe3KgLEuU",
    },
    {
        id: 4,
        category: "awards",
        categoryLabel: "Awards",
        title: "Corporate Recognition",
        date: "05 July 2025",
        location: "Muscat, Oman",
        image: "/images/archive/4.jpg",
        link: "https://youtu.be/GTAe3KgLEuU",
    },
];

export default function ArchiveListingSection() {
    const archive_list = [
        ...new Map(
            archiveData.map(item => [
                item.category,
                { value: item.category, label: item.categoryLabel }
            ])
        ).values()
    ];

    return (
        <section className="w-full py-[140px]">
            <div className="container">
                <Tabs defaultValue={archive_list[0]?.value}>
                    <TabsList className="gap-[10px] mb-[60px] flex flex-wrap">
                        {archive_list.map(item => (
                            <TabsTrigger
                                key={item.value}
                                value={item.value}
                                className="h-[40px] px-[25px]"
                            >
                                {item?.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {archive_list.map(item => (
                        <TabsContent key={item.value} value={item.value}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {archiveData
                                    .filter(card => card.category === item.value)
                                    .map(item => (
                                        <ArchiveCard key={item.id} item={item} />
                                    ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
}

function ArchiveCard({ item }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-6">
            <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>

            <div>
                <p className="text-xs font-semibold text-primary uppercase mb-2">
                    {item.categoryLabel}
                </p>

                <h3 className="text-lg font-semibold mb-4">{item.title}</h3>

                <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                        <Calendar size={16} /> {item.date}
                    </li>
                    <li className="flex items-center gap-2">
                        <MapPin size={16} /> {item.location}
                    </li>
                    <li className="flex items-center gap-2">
                        <Link2 size={16} />
                        <Link href={item.link} target="_blank" className="underline">
                            View Event
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
