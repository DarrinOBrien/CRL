function Footer() {
    const p = "text-[0.95rem] text-left mx-0 my-1";
    return (
        <footer className="flex justify-center items-start bg-[#333] text-[white] w-screen flex-wrap gap-8 px-8 py-4">
        <div className="flex flex-col items-end">
          <p className="text-[0.95rem] text-left mx-0 my-1">San Mateo County Community Resources</p>
          <p className="text-[0.95rem] text-left mx-0 my-1"><a href="https://d74b6c34.applicationengineeringclub.pages.dev" target="_blank" className="text-[#7ea8f8] no-underline hover:underline">Application Engineering Club</a> @ Aragon High School</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[0.95rem] text-left mx-0 my-1">By: Darrin</p>
          <p className="text-[0.95rem] text-left mx-0 my-1">UI Inspiration: Claire</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-[0.95rem] text-left mx-0 my-1">Questions/Feedback?</p>
          <p className="text-[0.95rem] text-left mx-0 my-1"><a href="https://forms.gle/CCkNNKSw4Mew196z5" target="_blank" className="text-[#7ea8f8] no-underline hover:underline">Please Fill Out This Form</a></p>
        </div>
      </footer>
    )
}

export default Footer;