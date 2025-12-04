import CardDetails from '@/components/Properties/CardDetails';
import { Property } from '@/types/property';
interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property`);
  const data = await res.json();
  console.log(data)
  return data?.data.properties.map((property: Property) => ({
    slug: property.slug,
  }));
}

const PropertiesDetailsPage = async ({ params }: PageProps) => {
  const { slug } =await params;
  console.log(slug)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/property/${slug}`,
    {
      cache: 'no-store',
    }
  );

  const property = await res.json();

  return <CardDetails property={property?.data as Property} />;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/property/${slug}`
  );
  const { data: property } = await res.json();
  if (!property) {
    return {
      title: 'Property Not Found',
    };
  }
  return {
    title: property.name,
    description: property.description,
    openGraph: {
      title: property.name,
      description: property.description,
      images: [property.images],
    },
  };
}

export default PropertiesDetailsPage;
