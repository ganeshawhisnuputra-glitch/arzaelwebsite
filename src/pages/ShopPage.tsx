import React, { useState } from 'react';
import { PRODUCTS_DATA } from '../data/products';
import { MediaPlaceholder } from '../components/common/MediaPlaceholder';
import { ShoppingBag, Check } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories = ['ALL', 'ARZAEL HANDMADE', 'SELF SABOTAGE', 'MUSIC'];

  const filteredProducts =
    selectedCategory === 'ALL'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (productId: string, title: string) => {
    setCartItems((prev) => [...prev, productId]);
    setAddedNotice(title);
    setTimeout(() => {
      setAddedNotice(null);
    }, 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 animate-fade-in">
      {/* Header & Opening Statement */}
      <div className="max-w-3xl mb-12">
        <span className="font-mono text-xs text-flesh-400 tracking-widest-artist uppercase mb-3 block">
          [ ARTIFACTS & EDITIONS ]
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-text-primary tracking-editorial font-bold mb-4">
          TAKE SOMETHING WITH YOU.
        </h1>
        <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-4">
          I make some of these things myself. Some exist only for this era.
          <br />
          Once some of them are gone, I don’t know if I’m making them again.
        </p>
      </div>

      {/* Handmade Note Highlight Banner */}
      <div className="bg-petrol-900/60 border border-flesh-500/40 p-6 sm:p-8 mb-12 relative overflow-hidden">
        <span className="font-mono text-xs text-flesh-400 uppercase tracking-widest block mb-2">
          NOTE ON HANDMADE ARTIFACTS
        </span>
        <h3 className="font-serif text-xl text-text-primary mb-2">MADE BY ME.</h3>
        <p className="text-sm text-text-muted leading-relaxed max-w-2xl font-sans">
          Literally. Not “designed by me.” I actually touched these. Which either makes them more valuable or significantly worse. You decide. Every piece is a little different. That’s the point.
        </p>
      </div>

      {/* Filter and Cart summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-petrol-800/80 pb-6 mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-petrol-800 text-flesh-300 border border-flesh-500/60'
                  : 'bg-petrol-950 text-text-dim border border-petrol-800 hover:text-text-primary hover:border-petrol-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-petrol-300">
          <ShoppingBag className="w-4 h-4" />
          <span>THINGS YOU’RE TAKING: {cartItems.length}</span>
        </div>
      </div>

      {/* Added notice banner */}
      {addedNotice && (
        <div className="mb-6 p-3 bg-flesh-950/80 border border-flesh-500 text-flesh-200 text-xs font-mono tracking-wider flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-flesh-400" />
          <span>Added "{addedNotice}" to your collection. (Checkout is inactive in V0)</span>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            className="bg-petrol-900/40 border border-petrol-800 flex flex-col justify-between p-6 hover:border-petrol-600 transition-all group"
          >
            <div>
              <div className="mb-4">
                <MediaPlaceholder id={product.imagePlaceholderId} />
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[10px] text-flesh-400 uppercase tracking-widest bg-flesh-950 px-2 py-0.5 border border-flesh-800/40">
                  {product.category}
                </span>
                <span className="font-mono text-sm font-semibold text-text-primary">
                  {product.price}
                </span>
              </div>

              <h2 className="font-serif text-lg text-text-primary font-medium mb-1 group-hover:text-flesh-300 transition-colors">
                {product.title}
              </h2>

              {product.subtitle && (
                <p className="font-mono text-xs text-text-dim mb-3">
                  {product.subtitle}
                </p>
              )}

              <p className="text-xs text-text-muted leading-relaxed mb-4">
                {product.description}
              </p>
            </div>

            <div className="pt-4 border-t border-petrol-800/60 flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] text-text-dim uppercase">
                {product.status === 'limited' ? 'LIMITED BATCH' : 'IN STOCK'}
              </span>

              <button
                onClick={() => handleAddToCart(product.id, product.title)}
                className="px-5 py-2.5 bg-petrol-900 border border-flesh-500/50 text-xs font-mono tracking-widest-artist uppercase text-flesh-300 hover:bg-flesh-900/80 hover:text-white transition-all flesh-glow"
              >
                KEEP THIS
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
