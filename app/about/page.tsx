import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Drop City',
  description: 'Learn about Drop City, the AR location-based drop app inspired by the 1960s Colorado art commune.',
};

export default function About() {
  return (
    <div className="pt-32 pb-24 px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-24">
          <p className="label text-gray-400 mb-4">About</p>
          <h1 className="text-title font-extralight mb-8">
            What is Drop City?
          </h1>
          <p className="text-large text-gray-500 dark:text-gray-400">
            An AR app that lets you leave digital messages anchored to 
            real-world GPS coordinates—and discover what others have left behind.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-16">
          <section>
            <h2 className="text-heading font-light mb-6">The Idea</h2>
            <div className="space-y-4 text-body text-gray-600 dark:text-gray-400">
              <p>
                Imagine walking through your city and stumbling upon invisible 
                messages—art, notes, memories—left by strangers at exact locations. 
                A love note on the corner where someone had their first kiss. 
                A protest message at a landmark. A drawing floating in your 
                favorite park.
              </p>
              <p>
                Drop City makes this possible. Using AR technology and GPS 
                precision, you can create "drops"—digital content pinned to 
                real-world coordinates. Others who pass by get notified. 
                They open their camera. The drop appears.
              </p>
              <p>
                It's geocaching meets street art meets social media.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-heading font-light mb-6">The Name</h2>
            <div className="space-y-4 text-body text-gray-600 dark:text-gray-400">
              <p>
                The original Drop City was a 1960s artists' commune in southern 
                Colorado. Pioneers of the counterculture, they built geodesic 
                domes from salvaged car tops—transforming junk into architecture, 
                waste into wonder.
              </p>
              <p>
                We're inspired by that spirit. Taking the overlooked spaces of 
                daily life and filling them with creativity. Building new forms 
                of expression from the materials at hand—in our case, GPS 
                coordinates and augmented reality.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-heading font-light mb-6">The Design</h2>
            <div className="space-y-4 text-body text-gray-600 dark:text-gray-400">
              <p>
                Drop City's interface follows Swiss-Hara design principles: 
                the mathematical precision of Josef Müller-Brockmann meets 
                the strategic emptiness (Ma) of Kenya Hara.
              </p>
              <p>
                The app itself is minimal—monochrome, rectangular, restrained. 
                The AR content is not. Your drops can be vibrant, chaotic, 
                whatever you want. The interface recedes. Your creation explodes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-heading font-light mb-6">The Technology</h2>
            <div className="space-y-4 text-body text-gray-600 dark:text-gray-400">
              <p>
                Built natively for iOS using SwiftUI, ARKit, and RealityKit. 
                Drops are stored with precise GPS coordinates and rendered as 
                billboarded AR entities that always face your camera.
              </p>
              <p>
                We use visual-inertial odometry for sub-meter accuracy. 
                When you're close to a drop, you'll find it—exactly where 
                its creator left it.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-heading font-light mb-6">Coming Soon</h2>
            <div className="space-y-4 text-body text-gray-600 dark:text-gray-400">
              <p>
                Drop City launches on iOS in 2025. We're currently in private 
                development, building the foundation for a new kind of 
                location-based social platform.
              </p>
              <p>
                Want to be among the first to explore? 
                <a href="/#notify" className="underline ml-1 hover:text-swiss-black dark:hover:text-white">
                  Sign up for early access.
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
