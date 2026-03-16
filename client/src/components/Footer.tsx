

const Footer = () => {
  return (
    <footer className='border-t border-gray-200 py-3 mt-20'>
      <div className='max-w-full mx-auto px-6 text-gray-600 text-sm'>
        <div className='flex justify-between items-center mt-5 '>
          <ul className='flex gap-3'>
            <li>Terms of Service</li> | <li>Privacy Policy</li>
          </ul>
          <p className='cascadia'>
            © {new Date().getFullYear()}
            <span className='cascadia font-semibold text-gray-800'> FinSense All Rights Reserved</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
