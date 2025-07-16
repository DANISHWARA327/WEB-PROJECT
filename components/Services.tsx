import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { MapPin, Car, Shield, Wrench, CreditCard, Users, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Services() {
  const services = [
    {
      icon: Car,
      title: 'Konsultasi Kendaraan',
      description: 'Konsultasi ahli untuk membantu Anda memilih kendaraan yang tepat sesuai kebutuhan.',
    },
    {
      icon: CreditCard,
      title: 'Opsi Pembiayaan',
      description: 'Berbagai pilihan pembiayaan dengan suku bunga kompetitif dan tenor fleksibel.',
    },
    {
      icon: Shield,
      title: 'Test Drive',
      description: 'Rasakan pengalaman berkendara langsung dengan jadwal test drive yang fleksibel.',
    },
    {
      icon: Wrench,
      title: 'Layanan Purna Jual',
      description: 'Perawatan dan perbaikan kendaraan dengan teknisi berpengalaman.',
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4 text-accent">
            Layanan Kami & Lokasi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kami dengan bangga melayani klien kami di dealer flagship di Singapura. Kunjungi kami untuk menjelajahi koleksi kendaraan premium dan mendapatkan layanan personal.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Location Info */}
          <div className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">AutoElite Dealer - Singapura</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Dealer flagship kami berlokasi di jantung Singapura dengan fasilitas modern dan koleksi kendaraan premium terlengkap.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Jam Operasional:</p>
                      <p className="text-sm text-gray-600">Sen-Jum: 09:00 - 20:00</p>
                      <p className="text-sm text-gray-600">Sab-Min: 10:00 - 18:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Tim Profesional</p>
                      <p className="text-sm text-gray-600">Konsultan berpengalaman siap membantu Anda</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map and Dealer Image */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Singapore Map */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Lokasi Dealer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19036168134!2d103.67943142890625!3d1.3143394741842226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da11238a8b9375%3A0x887869cf52abf5c4!2sSingapore!5e0!3m2!1sen!2sid!4v1645123456789!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AutoElite Dealer Location Singapore"
                />
              </div>
            </CardContent>
          </Card>

          {/* Dealer Building */}
          <Card>
            <CardHeader>
              <CardTitle>Showroom AutoElite</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="AutoElite Dealer Building Exterior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Fasilitas modern dengan showroom seluas 2.000 m² menampilkan koleksi kendaraan premium terbaik dari berbagai merek ternama dunia.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}