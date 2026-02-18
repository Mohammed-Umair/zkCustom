import { FormEvent, useMemo, useState } from 'react';
import { products, reviews, shopOwnerEmail, testimonials } from './data';
import { CartItem } from './types';

type Page = 'home' | 'product' | 'order';

const heroSlides = [
  {
    title: 'Design Your Dream Keycaps',
    subtitle: 'Upload your style, colors, and legends in minutes.',
    image:
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Premium Materials',
    subtitle: 'PBT, ABS and artisan resin options crafted for long durability.',
    image:
      'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'From Sketch to Keyboard',
    subtitle: 'Our designers verify your concept before production starts.',
    image:
      'https://images.unsplash.com/photo-1613141412501-9012977f1969?auto=format&fit=crop&w=1200&q=80'
  }
];

const paymentQr =
  'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=Pay%20KeyCraft%20Order';

function App() {
  const [page, setPage] = useState<Page>('home');
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);
  const [cart, setCart] = useState<CartItem[]>([]);

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedProductId) ?? products[0],
    [selectedProductId]
  );

  const openProduct = (productId: string) => {
    setSelectedProductId(productId);
    setPage('product');
  };

  const addCustomization = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const item: CartItem = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      colorTheme: String(form.get('colorTheme') || ''),
      legendText: String(form.get('legendText') || ''),
      artisanIcon: String(form.get('artisanIcon') || ''),
      quantity: Number(form.get('quantity') || '1'),
      unitPrice: selectedProduct.price
    };

    setCart((current) => [...current, item]);
    setPage('order');
    event.currentTarget.reset();
  };

  const subtotal = cart.reduce((total, item) => total + item.quantity * item.unitPrice, 0);

  const sendOrderEmail = () => {
    const details = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.productName} | Qty: ${item.quantity} | Theme: ${item.colorTheme} | Legends: ${item.legendText} | Icon: ${item.artisanIcon}`
      )
      .join('%0D%0A');

    const subject = encodeURIComponent('New Keycap Customization Booking');
    const body = `Hello KeyCraft team,%0D%0A%0D%0APlease confirm this custom keycap order:%0D%0A${details}%0D%0A%0D%0ATotal: $${subtotal}%0D%0A%0D%0AThank you.`;

    window.location.href = `mailto:${shopOwnerEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button className="text-lg font-semibold text-brand-500" onClick={() => setPage('home')}>
            KeyCraft
          </button>
          <div className="flex gap-3 text-sm">
            <button onClick={() => setPage('home')} className="rounded px-3 py-1 hover:bg-slate-800">
              Home
            </button>
            <button onClick={() => setPage('product')} className="rounded px-3 py-1 hover:bg-slate-800">
              Product
            </button>
            <button onClick={() => setPage('order')} className="rounded px-3 py-1 hover:bg-slate-800">
              Order ({cart.length})
            </button>
          </div>
        </nav>
      </header>

      {page === 'home' && (
        <main className="mx-auto max-w-6xl space-y-12 px-4 py-8">
          <section className="grid gap-6 rounded-2xl bg-slate-900 p-6 md:grid-cols-2">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{heroSlides[slideIndex].title}</h1>
              <p className="text-slate-300">{heroSlides[slideIndex].subtitle}</p>
              <div className="flex gap-2">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSlideIndex(idx)}
                    className={`h-2 w-8 rounded ${
                      idx === slideIndex ? 'bg-brand-500' : 'bg-slate-700'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => openProduct(products[0].id)}
                className="rounded bg-brand-600 px-4 py-2 font-medium hover:bg-brand-500"
              >
                Customize Now
              </button>
            </div>
            <img
              src={heroSlides[slideIndex].image}
              className="h-72 w-full rounded-xl object-cover"
              alt="Custom keycaps showcase"
            />
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Product Gallery</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {products.map((product) => (
                <article key={product.id} className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
                  <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
                  <div className="space-y-2 p-4">
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <p className="text-sm text-slate-300">{product.description}</p>
                    <button
                      onClick={() => openProduct(product.id)}
                      className="rounded bg-brand-600 px-3 py-2 text-sm hover:bg-brand-500"
                    >
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {testimonials.map((entry) => (
              <blockquote key={entry.name} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-sm text-slate-200">“{entry.quote}”</p>
                <footer className="mt-3 text-xs text-slate-400">
                  {entry.name} · {entry.role}
                </footer>
              </blockquote>
            ))}
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">Latest Reviews</h2>
            <div className="space-y-2">
              {reviews.map((review) => (
                <div key={review.title} className="rounded-lg border border-slate-800 bg-slate-900 p-3 text-sm">
                  <span className="mr-2 text-brand-500">{'★'.repeat(review.rating)}</span>
                  {review.title} — <span className="text-slate-400">{review.author}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {page === 'product' && (
        <main className="mx-auto max-w-4xl px-4 py-8">
          <h2 className="mb-4 text-2xl font-semibold">Single Product Details</h2>
          <div className="grid gap-6 rounded-xl border border-slate-800 bg-slate-900 p-4 md:grid-cols-2">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="h-80 w-full rounded-lg object-cover" />
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
              <p className="text-slate-300">{selectedProduct.description}</p>
              <p className="text-sm text-slate-400">
                Profile: {selectedProduct.profile} · Material: {selectedProduct.material}
              </p>
              <p className="text-xl font-semibold text-brand-500">${selectedProduct.price}</p>

              <form className="space-y-3" onSubmit={addCustomization}>
                <input
                  name="colorTheme"
                  required
                  placeholder="Color theme (e.g., Black + Gold)"
                  className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2"
                />
                <input
                  name="legendText"
                  required
                  placeholder="Legend text (e.g., WASD, your initials)"
                  className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2"
                />
                <input
                  name="artisanIcon"
                  placeholder="Artisan icon style (optional)"
                  className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2"
                />
                <input
                  name="quantity"
                  type="number"
                  min={1}
                  defaultValue={1}
                  className="w-32 rounded border border-slate-700 bg-slate-950 px-3 py-2"
                />
                <button className="rounded bg-brand-600 px-4 py-2 font-medium hover:bg-brand-500">
                  Add Custom Order
                </button>
              </form>
            </div>
          </div>
        </main>
      )}

      {page === 'order' && (
        <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
          <h2 className="text-2xl font-semibold">Book Your Order</h2>

          <section className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <h3 className="mb-3 font-medium">Order Details</h3>
              {cart.length === 0 ? (
                <p className="text-sm text-slate-400">No customizations added yet. Go to Product page first.</p>
              ) : (
                <div className="space-y-3 text-sm">
                  {cart.map((item, idx) => (
                    <div key={`${item.productId}-${idx}`} className="rounded border border-slate-800 bg-slate-950 p-3">
                      <p className="font-medium">{item.productName}</p>
                      <p>Theme: {item.colorTheme}</p>
                      <p>Legends: {item.legendText}</p>
                      <p>Icon: {item.artisanIcon || 'N/A'}</p>
                      <p>
                        Qty: {item.quantity} × ${item.unitPrice}
                      </p>
                    </div>
                  ))}
                  <p className="text-lg font-semibold">Subtotal: ${subtotal}</p>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-center">
              <h3 className="mb-3 font-medium">Scan to Pay</h3>
              <p className="mb-2 text-sm text-slate-300">Use any UPI/Wallet app to scan and pay.</p>
              <img src={paymentQr} alt="Payment QR code scanner" className="mx-auto mb-3 rounded bg-white p-2" />
              <button
                onClick={sendOrderEmail}
                disabled={cart.length === 0}
                className="rounded bg-brand-600 px-4 py-2 font-medium hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                Send Booking Details via Email
              </button>
              <p className="mt-2 text-xs text-slate-400">Owner Email: {shopOwnerEmail}</p>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
