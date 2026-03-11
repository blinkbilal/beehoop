import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-background-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-800 pt-8 pb-12">
          <Image
            src="/name-colored.png"
            alt="beehoop"
            width={130}
            height={36}
            style={{ height: 'auto', width: '110px' }}
          />
          <span className="font-sans text-sm text-gray-500 mt-4 sm:mt-0">
            &copy; {new Date().getFullYear()} beehoop. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
