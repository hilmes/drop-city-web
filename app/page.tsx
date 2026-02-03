import { PythagoreanTree } from './components/PythagoreanTree';
import { WaitlistForm } from './components/WaitlistForm';

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="label text-gray-400">Beta by invite only</p>
              <h1 className="text-hero font-extralight tracking-tight">
                Digital graffiti<br />
                <span className="text-gray-400">for the real world</span>
              </h1>
            </div>
            
            <p className="text-large text-gray-500 dark:text-gray-400 max-w-lg">
              Leave invisible messages at real-world coordinates. 
              Walk by, discover what's hidden. 
              Your city holds secrets.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#access"
                className="btn-primary inline-block"
              >
                Request Early Access
              </a>
              <a 
                href="#how"
                className="btn-secondary inline-block"
              >
                How It Works
              </a>
            </div>
            
            <p className="label text-gray-400">
              iOS · Coming 2025
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

      {/* Mystery Section */}
      <section className="ma-lg px-8 bg-gray-50 dark:bg-gray-800/50 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-title font-extralight leading-tight mb-6">
            "What if every corner held a secret?"
          </blockquote>
          <p className="text-body text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            A love note on the corner where someone had their first kiss. 
            A protest at the steps of City Hall. 
            Art floating in your favorite park. 
            Messages waiting to be found.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="ma-xl px-8 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <p className="label text-gray-400 mb-4">The Concept</p>
            <h2 className="text-title font-extralight">
              GPS meets augmented reality
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
                Create something—photo, text, drawing—and pin it to your 
                exact coordinates. It becomes part of that place.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="space-y-4">
              <div className="w-16 h-16 border-2 border-swiss-black dark:border-white flex items-center justify-center">
                <span className="text-heading font-extralight">02</span>
              </div>
              <h3 className="text-subheading font-light">Walk</h3>
              <p className="text-body text-gray-500 dark:text-gray-400">
                Move through your city. When you're near a drop, 
                you'll know. Something's waiting to be discovered.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="space-y-4">
              <div className="w-16 h-16 border-2 border-swiss-black dark:border-white flex items-center justify-center">
                <span className="text-heading font-extralight">03</span>
              </div>
              <h3 className="text-subheading font-light">Reveal</h3>
              <p className="text-body text-gray-500 dark:text-gray-400">
                Open your camera. The drop appears, floating in the real world 
                exactly where someone left it. AR magic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access Section */}
      <section id="access" className="ma-xl px-8 scroll-mt-24">
        <div className="max-w-xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <p className="label text-gray-400">Limited Beta</p>
            <h2 className="text-title font-extralight">
              Join the first explorers
            </h2>
            <p className="text-body text-gray-500 dark:text-gray-400">
              We're building something different. Access is limited. 
              Early members help shape what Drop City becomes.
            </p>
          </div>
          
          <WaitlistForm />
        </div>
      </section>

      {/* Origin Story */}
      <section className="ma-xl px-8">
        <div className="max-w-4xl mx-auto">
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-8 py-4">
            <p className="label text-gray-400 mb-4">Why "Drop City"?</p>
            <p className="text-body text-gray-500 dark:text-gray-400 mb-4">
              In 1965, a group of artists built a commune in southern Colorado. 
              They made geodesic domes from salvaged car tops—junk transformed 
              into architecture, waste into wonder.
            </p>
            <p className="text-body text-gray-500 dark:text-gray-400">
              We're inspired by that spirit. Taking overlooked spaces and filling 
              them with creativity. Building new forms of expression from the 
              materials at hand—GPS coordinates and augmented reality.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="ma-xl px-8 pb-24">
        <div className="max-w-6xl mx-auto border-2 border-swiss-black dark:border-white p-16 text-center">
          <h2 className="text-heading font-extralight mb-4">
            Your city is waiting
          </h2>
          <p className="text-body text-gray-500 dark:text-gray-400 mb-8">
            What will you leave behind?
          </p>
          <a href="#access" className="btn-primary inline-block">
            Request Access
          </a>
        </div>
      </section>
    </div>
  );
}
