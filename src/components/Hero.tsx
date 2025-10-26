import { Button } from './ui/button';

export function Hero() {
  return (
    <section
      className="relative py-20 px-4 text-center text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172')",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Discover the Power of Millets
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Direct from farmers to your table - fresh, organic, and nutritious millet products
        </p>
        <Button
          size="lg"
          className="bg-secondary hover:bg-secondary/90 text-white"
          onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Shop Now
        </Button>
      </div>
    </section>
  );
}
