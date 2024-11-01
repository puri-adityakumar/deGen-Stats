import React, { useState } from 'react'
import {
  Dialog,
  DialogPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import logox from '../../assets/blockchain.png'


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-teal-200 to-teal-600">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-6">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex items-center space-x-3">
            <span className="sr-only">Your Company</span>
            <img 
              alt="DeGen Stats" 
              src="http://i.pinimg.com/736x/70/02/43/70024331af3414b799ec18621039eaaf.jpg" 
              className="h-12 w-auto rounded-lg" 
            />
            <h1 className="text-2xl font-bold tracking-tight text-indigo-600" >
              DeGen <span className="text-black">Stats</span>
            </h1>

            {/* <h1 className="text-2xl">
              <span className="font-bold text-blue-500" style={{ fontFamily: 'Dancing Script, cursive' }}>de</span>
              <span className="font-extrabold text-black" style={{ fontFamily: 'Dancing Script, cursive' }}>Gen</span>
              <span className="font-bold text-blue-600" style={{ fontFamily: 'Poppins, sans-serif' }}> stats</span>
            </h1> */}
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:bg-teal-500 transition-colors"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          <Link 
            to="/" 
            className="text-md font-semibold leading-6 text-white transition-colors hover:text-teal-100"
          >
            Home
          </Link>
          <Link 
            to="/Converter" 
            className="text-md font-semibold leading-6 text-white transition-colors hover:text-teal-100"
          >
            Currency Converter
          </Link>
        </div>

        {/* GitHub link */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="https://github.com/puri-adityakumar/deGen-Stats"
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-105"
          >
            <img 
              src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" 
              alt="GitHub" 
              className="h-8 w-8 rounded-full" 
            />
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog 
        as="div" 
        className="lg:hidden" 
        open={mobileMenuOpen} 
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-teal-500 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img 
                alt="" 
                src="https://i.pinimg.com/736x/70/02/43/70024331af3414b799ec18621039eaaf.jpg" 
                className="h-12 w-auto rounded-lg md:hidden" 
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white hover:bg-teal-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-teal-400">
              <div className="space-y-2 py-6">
                <Link
                  to="/"
                  className="group -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-teal-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/Converter"
                  className="group -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-teal-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Currency Converter
                </Link>
              </div>
              <div className="py-6">
                <a
                  href="https://github.com/puri-adityakumar/deGen-Stats"
                  className="inline-block w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-105"
                >
                  <img 
                    src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" 
                    alt="GitHub" 
                    className="h-7 w-7 rounded-full" 
                  />
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}