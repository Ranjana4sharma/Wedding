const WHATSAPP_NUMBER = '91XXXXXXXXXX';
const PHONE = '+91 XXXXX XXXXX';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display font-semibold text-gray-900">Print Studio</h3>
            <p className="mt-2 text-sm text-gray-600">
              Best printing & design services. Choose your design and order instantly.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 text-sm">Phone</h4>
            <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="mt-1 block text-sm text-gray-600 hover:text-gray-900">
              {PHONE}
            </a>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 text-sm">WhatsApp</h4>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm text-gray-600 hover:text-gray-900"
            >
              Chat with us
            </a>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 text-sm">Address</h4>
            <p className="mt-1 text-sm text-gray-600">
              Mandi Tiraha Bidhuna Road Bharthana Etawah
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          © 2026 Print Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
