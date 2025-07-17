

import NewsDetails from '@/components/news/NewsDetails';
import React from 'react';

import ScrollAnimation from '@/components/common/ScrollAnimation';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';

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
            <Header />
            <main className="overflow-hidden">
                {/* Hero Section */}
                <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <div className="flex flex-col items-center">
                            <div className="w-full">
                                <ScrollAnimation animation="fade" className="mb-16" delay={400}>

                                    <NewsDetails
                                        title={news.title}
                                        content={news.content}
                                        imageUrl={news.imageUrl}
                                        publishedAt={news.publishedAt}
                                    />
                                </ScrollAnimation>


                            </div>
                        </div>
                    </div>
                </section>
            </main>



            <Footer />
        </div>
    );
};

