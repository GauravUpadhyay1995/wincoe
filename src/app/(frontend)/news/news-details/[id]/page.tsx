

import NewsDetails from '@/components/news/NewsDetails';
import React from 'react';

import ScrollAnimation from '@/components/common/ScrollAnimation';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import UnderDevelopment from '@/components/common/UnderDev';

type Props = {
    params: {
        id: string;
    };
};
async function getNewsById(id: string) {
    console.log(id)
    // You can use id here to fetch data from DB or API
    return {
        title: 'AI Research Breakthrough',
        content:
            'Researchers at WINCOE University have achieved a major breakthrough in AI by developing a model that learns 10x faster than previous versions.',
        imageUrl: '/images/news/news-7.jpg',
        publishedAt: '2025-07-17T10:00:00Z',
    };
}

export default async function NewsDetailsPage({ params }: Props) {
    const news = await getNewsById(params.id);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
           <UnderDevelopment />
        </div>
    );
};

