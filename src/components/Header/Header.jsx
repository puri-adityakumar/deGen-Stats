import React from 'react'
import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import Converter from '../Converter/Converter'



export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
      <header className="bg-white">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          

            
            {/* For Logo */}

            <div className="flex lg:flex-1">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img alt="" src="https://i.pinimg.com/736x/70/02/43/70024331af3414b799ec18621039eaaf.jpg" className="h-14 w-auto" />
              </a>
            </div>


            {/* For the hamburger button fuctionality */}

            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <div className="hidden lg:flex lg:gap-x-12">

              <p class="text-md m-2 group relative w-max">
                <span><Link to="/" className="text-md font-semibold leading-6 ">Home</Link></span>
                <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
              </p>
              <p class="text-md m-2 group relative w-max">
                <span><Link to="/Converter" className="text-md font-semibold leading-6 ">Currency Converter</Link></span>
                <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
                <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
              </p>
            </div>

            {/* Top right GH Icon */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-end bg">
              <a href="https://github.com/puri-adityakumar/deGen-Stats" className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white text-base font-medium  hover:bg-gray-500">
                <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="" className="h-10 w-auto rounded-full" /> 
              </a>
            </div>

            
        </nav>


        {/* This is from small medium screen for utilizing hamburger menu */}

        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img alt="" src="https://i.pinimg.com/736x/70/02/43/70024331af3414b799ec18621039eaaf.jpg" className="h-14 w-auto md:hidden" />
              </a>

              {/* This button closes the menu */}

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>


            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    to="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Home
                  </Link>
                  <Link
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Currency Converter
                  </Link>
                </div>
                <div className="flex items-center lg:order-2 py-6 ">
                  <a href="https://github.com/puri-adityakumar/deGen-Stats" className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white text-base font-medium  hover:bg-gray-500 ">
                    <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="" className="h-8 w-auto rounded-full" /> 
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    )
}