export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Auxilium Consult</h3>
            <p className="text-gray-300 text-sm">
              Bridging the gap between promising African enterprises and global capital through trust, structure, and innovation.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">Startup Advisory</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">SME Growth Consulting</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Investment Structuring</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Capital Partnerships</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Sectors</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Energy</li>
              <li className="text-gray-300">Agribusiness</li>
              <li className="text-gray-300">Mining</li>
              <li className="text-gray-300">Industry</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">Accra, Ghana</p>
              <p className="text-gray-300">info@auxiliumconsult.com</p>
              <p className="text-gray-300">+233 XX XXX XXXX</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Auxilium Consult. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}