
import { Suspense } from 'react';
import ProductsGrid from './products-grid';
import ProductsLoading from './products-loading';

export default function ProductsPage() {
  return (
    <div className="bg-background">
        <div className="container py-16 md:py-24">
            <div className="text-center mb-16">
                <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">The AWKWorld Collection</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                  An exclusive curation of ready-to-wear, streetwear, and accessories. Each piece a statement.
                </p>
            </div>
            <Suspense fallback={<ProductsLoading />}>
              <ProductsGrid />
            </Suspense>
            </div>
    </div>
  );
}
