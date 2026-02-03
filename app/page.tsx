import { PythagoreanTree } from './components/PythagoreanTree';

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="space-y-8">
            <h1 className="text-hero font-extralight tracking-tight">
              Digital graffiti<br />
              <span className="text-gray-400">for the real world</span>
            </h1>
            
            <p className="text-large text-gray-500 dark:text-gray-400 max-w-lg">
              Leave AR messages pinned to real-world coordinates. 
              Discover what others have left behind. 
              Your city becomes a canvas.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#notify"
                className="btn-primary inline-block"
              >
                Get Notified
              </a>
              <a 
                href="#features"
                className="btn-secondary inline-block"
              >
                Learn More
              </a>
            </div>
            
            <p className="label text-gray-400">
              Coming to iOS · 2025
            </p>
          </div>
          
          {/* Tree Visual */}
          <div className="relative h-[400px] lg:h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-md">
                <PythagoreanTree />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="ma-xl px-8 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <p className="label text-gray-400 mb-4">How It Works</p>
            <h2 className="text-title font-extralight">
              GPS coordinates meet<br />augmented reality
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Feature 1 */}
            <div className="space-y-4">
              <div className="w-16 h-16 border-2 border-swiss-black dark:border-white flex items-center justify-center">
                <span className="text-heading font-extralight">01</span>
              </div>
              <h3 className="text-subheading font-light">Drop</h3>
              <p className="text-body text-gray-500 dark:text-gray-400">
                Create an AR drop—photo, text, or drawing—and pin it to your 
                exact location. It stays there until you decide otherwise.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="space-y-4">
              <div className="w-16 h-16 border-2 border-swiss-black dark:border-white flex items-center justify-center">
                <span className="text-heading font-extralight">02</span>
              </div>
              <h3 className="text-subheading font-light">Discover</h3>
              <p className="text-body text-gray-500 dark:text-gray-400">
                Walk by a drop and get notified. Open your camera to reveal 
                the AR content floating in the real world.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="space-y-4">
              <div className="w-16 h-16 border-2 border-swiss-black dark:border-white flex items-center justify-center">
                <span className="text-heading font-extralight">03</span>
              </div>
              <h3 className="text-subheading font-light">Connect</h3>
              <p className="text-body text-gray-500 dark:text-gray-400">
                Follow creators, explore neighborhoods, and build a community 
                of urban digital artists and explorers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="ma-xl px-8 bg-gray-50 dark:bg-gray-800/50 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-title font-extralight leading-tight mb-8">
            "What if every corner held a secret?<br />
            What if your morning commute became an expedition?"
          </blockquote>
          <p className="text-body text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Drop City transforms passive space into interactive canvas. 
            Inspired by the 1960s Colorado commune where artists built geodesic 
            domes from car tops, we're building a new kind of creative space—one 
            that exists in the gaps between digital and physical.
          </p>
        </div>
      </section>

      {/* Notify Section */}
      <section id="notify" className="ma-xl px-8 scroll-mt-24">
        <div className="max-w-xl mx-auto text-center space-y-8">
          <p className="label text-gray-400">Stay Updated</p>
          <h2 className="text-title font-extralight">
            Be first to explore
          </h2>
          <p className="text-body text-gray-500 dark:text-gray-400">
            Drop City is coming to iOS in 2025. Leave your email 
            and we'll let you know when it's ready.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="your@email.com"
              className="flex-1 px-4 py-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-body focus:border-swiss-black dark:focus:border-white outline-none transition-colors"
              required
            />
            <button 
              type="submit"
              className="btn-primary whitespace-nowrap"
            >
              Notify Me
            </button>
          </form>
          
          <p className="text-tiny text-gray-400">
            No spam. Just launch updates.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="ma-xl px-8 pb-24">
        <div className="max-w-6xl mx-auto border-2 border-swiss-black dark:border-white p-16 text-center">
          <h2 className="text-heading font-extralight mb-4">
            Your city is waiting
          </h2>
          <p className="text-body text-gray-500 dark:text-gray-400 mb-8">
            Drop City. Leave your mark.
          </p>
          <a href="#notify" className="btn-primary inline-block">
            Get Early Access
          </a>
        </div>
      </section>
    </div>
  );
}
