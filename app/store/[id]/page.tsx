import { Header } from "@/components/Header";
import { getProductById, products } from "@/lib/products";
import { ProductInteraction } from "@/components/ProductInteraction";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col grid-bg">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/store" className="hover:text-indigo-400 transition-colors">
            Store
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center relative">
              <div className="text-9xl">
                {product.category === "apparel" ? "👕" : "🎒"}
              </div>
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">Out of Stock</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {product.featured && (
              <div className="inline-block bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold mb-4">
                ⭐ Featured Product
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {product.name}
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="glass p-6 rounded-xl mb-8">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-white">${product.price}</span>
                {product.priceInETH && (
                  <span className="text-xl text-gray-400">or {product.priceInETH} ETH</span>
                )}
              </div>
              <p className="text-gray-400 text-sm mt-2">💰 Crypto payments accepted!</p>
            </div>

            {/* Interactive Product Selection */}
            <ProductInteraction product={product} />

            <Link
              href="/store"
              className="block w-full py-4 glass border border-gray-700 text-gray-300 text-center rounded-xl hover:bg-gray-800 transition-all font-semibold"
            >
              Continue Shopping
            </Link>

            {/* Product Features */}
            <div className="mt-12 space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="text-white font-semibold">Fast Shipping</h3>
                  <p className="text-gray-400 text-sm">Ships in 2-3 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💎</span>
                <div>
                  <h3 className="text-white font-semibold">Premium Quality</h3>
                  <p className="text-gray-400 text-sm">High-quality materials built to last</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔄</span>
                <div>
                  <h3 className="text-white font-semibold">30-Day Returns</h3>
                  <p className="text-gray-400 text-sm">No questions asked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
