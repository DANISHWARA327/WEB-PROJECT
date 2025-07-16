import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Eye, Zap, Leaf } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import gt2rsImage from 'figma:asset/9614c49684ebeeb3ae6297ce309f9ea3e1731d75.png';
import taycanImage from 'figma:asset/569a0e2e3710f297b23f5f6562225422a9234888.png';

export function VehicleCollection() {
  const vehicles = [
    {
      id: 1,
      name: 'Porsche GT2 RS',
      price: 'Rp 8.5 Miliar',
      description: 'Mobil sport berperforma tinggi dengan mesin twin-turbo 3.8L yang menghasilkan 700 hp. Dirancang untuk trek dengan teknologi aerodinamis canggih.',
      image: gt2rsImage,
      badge: 'Track Ready',
      icon: Zap,
      specs: {
        power: '700 HP',
        acceleration: '0-100 km/h: 2.8s',
        topSpeed: '340 km/h'
      }
    },
    {
      id: 2,
      name: 'Porsche Taycan',
      price: 'Rp 3.2 Miliar',
      description: 'Mobil sport elektrik pertama dari Porsche dengan performa luar biasa dan teknologi pengisian cepat. Menggabungkan kemewahan dengan keberlanjutan.',
      image: taycanImage,
      badge: 'Electric Performance',
      icon: Leaf,
      specs: {
        power: '761 HP',
        acceleration: '0-100 km/h: 2.6s',
        range: '464 km'
      }
    },
    {
      id: 3,
      name: 'Porsche 918 Hybrid',
      price: 'Rp 18.5 Miliar',
      description: 'Hypercar hibrida legendaris yang memadukan mesin V8 4.6L dengan motor listrik. Produksi terbatas dengan teknologi Formula 1.',
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      badge: 'Hybrid Supercar',
      icon: Eye,
      specs: {
        power: '887 HP',
        acceleration: '0-100 km/h: 2.5s',
        topSpeed: '345 km/h'
      }
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4 text-accent">
            Koleksi Kendaraan Premium
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jelajahi koleksi eksklusif kendaraan performa tinggi dari Porsche, mulai dari supercar track-ready hingga teknologi hybrid terdepan.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                {vehicle.id === 1 || vehicle.id === 2 ? (
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <ImageWithFallback
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary/90 text-white">
                    <vehicle.icon className="h-3 w-3 mr-1" />
                    {vehicle.badge}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-primary">{vehicle.price}</span>
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl text-accent">{vehicle.name}</CardTitle>
                <CardDescription className="text-base line-clamp-3">
                  {vehicle.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Tenaga</span>
                      <span className="font-medium">{vehicle.specs.power}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Akselerasi</span>
                      <span className="font-medium">{vehicle.specs.acceleration}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">
                        {vehicle.specs.topSpeed ? 'Kecepatan Maks' : 'Jarak Tempuh'}
                      </span>
                      <span className="font-medium">
                        {vehicle.specs.topSpeed || vehicle.specs.range}
                      </span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 group">
                    <Eye className="h-4 w-4 mr-2" />
                    Lihat Detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-white">
            Lihat Semua Koleksi
          </Button>
        </div>
      </div>
    </section>
  );
}