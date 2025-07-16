import { Button } from './ui/button';
import { ArrowRight, Star } from 'lucide-react';
import mainImage from 'figma:asset/5c62b1b0b098d114d4a69d413394416416f2add3.png';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="lg:pr-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">Dinilai Dealer Mobil Premium #1</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl mb-6 text-accent">
              Premium <span className="text-primary">Performance</span> Vehicles
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience the pinnacle of automotive engineering with our exclusive collection of high-performance vehicles. From track-ready supercars to luxury daily drivers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group bg-primary hover:bg-primary/90">
                View Collection
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-white">
                Schedule Test Drive
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t">
              <div>
                <div className="text-2xl mb-1 text-accent">500+</div>
                <div className="text-sm text-gray-600">Kendaraan Terjual</div>
              </div>
              <div>
                <div className="text-2xl mb-1 text-accent">50+</div>
                <div className="text-sm text-gray-600">Merek Premium</div>
              </div>
              <div>
                <div className="text-2xl mb-1 text-accent">15</div>
                <div className="text-sm text-gray-600">Tahun Pengalaman</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={mainImage}
                alt="Premium Porsche GT3 RS Sports Car"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl transform rotate-3 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}