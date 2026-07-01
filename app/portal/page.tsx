export default function ClientPortalPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
        <div className="text-2xl font-bold text-[#0b2340] mb-2">PracticeGuard</div>
        <div className="text-sm text-gray-500 mb-6">Client Portal</div>
        <p className="text-gray-600 text-sm">
          Your client portal is being built and will be available soon. In the meantime,
          reach out directly for anything you need.
        </p>
        <div className="mt-6 text-sm">
          <a href="mailto:dallas@practiceguardcompliance.com" className="text-[#14b8a6] hover:underline">
            dallas@practiceguardcompliance.com
          </a>
          <br />
          <a href="tel:6157853493" className="text-[#14b8a6] hover:underline">
            (615) 785-3493
          </a>
        </div>
      </div>
    </div>
  )
}
