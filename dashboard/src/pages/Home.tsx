import { useEffect } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { Button } from "../components/ui/Button";
export function Home() {
  const products = useAppStore(state => state.products);
  const fetchProducts = useAppStore(state => state.fetchProducts);
  const featured = products[0]; // Laptops
  const trendingToday = [...products].sort((a, b) => b.clickedToday - a.clickedToday).slice(0, 4);
  const trendingWeek = [...products].sort((a, b) => b.clickedWeek - a.clickedWeek).slice(0, 4);


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (!featured) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">No products found</h1>
        <p className="text-slate-500">Check back later for new arrivals.</p>
      </div>
    );
  }
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="bg-slate-950 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={featured.image}
            alt={featured.name}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold mb-6 border border-blue-500/30">
              <Star className="w-3 h-3 fill-current" />
              New Arrival
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Precision.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Perfected.</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-md">
              {featured.description}
            </p>
            <div className="flex items-center gap-4">
              <Link to={`/product/${featured.id}`}>
                <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-100 rounded-full font-bold">
                  Buy Now - ₹{featured.price}
                </Button>
              </Link>
              <Link to="/catalog" className="text-slate-300 hover:text-white font-medium flex items-center gap-2 transition-colors">
                View Catalog <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Categories / Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Trending Today</h2>
            <p className="text-slate-500">The gear everyone is talking about.</p>
          </div>
          <Link to="/catalog" className="hidden sm:flex text-blue-600 font-medium items-center gap-1 hover:text-blue-700 transition-colors">
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingToday.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="group relative border border-slate-200 rounded-2xl p-4 bg-white flex flex-col hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
              <div className="aspect-square bg-slate-50 rounded-xl mb-4 overflow-hidden relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {product.stock === 0 && (
                  <div className="absolute top-2 right-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded">SOLD OUT</div>
                )}
              </div>
              <div className="text-xs font-semibold text-blue-600 mb-1">{product.category}</div>
              <h3 className="font-bold text-slate-900 mb-1 leading-snug line-clamp-1">{product.name}</h3>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="font-bold text-lg">₹{product.price}</span>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Trending This Week</h2>
            <p className="text-slate-500">The gear everyone is talking about.</p>
          </div>
          <Link to="/catalog" className="hidden sm:flex text-blue-600 font-medium items-center gap-1 hover:text-blue-700 transition-colors">
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingWeek.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="group relative border border-slate-200 rounded-2xl p-4 bg-white flex flex-col hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
              <div className="aspect-square bg-slate-50 rounded-xl mb-4 overflow-hidden relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {product.stock === 0 && (
                  <div className="absolute top-2 right-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded">SOLD OUT</div>
                )}
              </div>
              <div className="text-xs font-semibold text-blue-600 mb-1">{product.category}</div>
              <h3 className="font-bold text-slate-900 mb-1 leading-snug line-clamp-1">{product.name}</h3>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="font-bold text-lg">₹{product.price}</span>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
