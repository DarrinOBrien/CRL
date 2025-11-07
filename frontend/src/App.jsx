import { useState, useEffect } from 'react'
import axios from 'axios';
import MultiSelectDropdown from "/components/DropdownCheckbox"
import chroma from "chroma-js";
import Footer from "/components/Footer"
import Testimonials from "/components/Testimonials"

function App() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [query, setQuery] = useState('')
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [establishments, setEstablishments] = useState([]);
  const [colors, setColors] = useState([]);

  const noFiltersSelected = !query && selectedTags.length === 0 && selectedCategories.length === 0;

  // Fetch filters from backend once after rendering
  useEffect(() => {
    const fetchFilters = async() => {
      try {
        const tagsResponse = await axios.get(`${API_BASE_URL}/tags/`);
        const categoriesResponse = await axios.get(`${API_BASE_URL}/categories/`);
        const tagsData = Array.isArray(tagsResponse.data) ? tagsResponse.data : [];
        const categoriesData = Array.isArray(categoriesResponse.data) ? categoriesResponse.data : [];

        setTags(tagsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };
    fetchFilters();
  }, []);

  // Fetch establishments iff query/tag/category provided
  useEffect(() => {
    const fetchEstablishments = async() => {
      if (!query && selectedTags.length === 0 && selectedCategories.length === 0) {
        setEstablishments([]);
        return;
      }

      try {
        const params = {
          search: query,
          categories: selectedCategories,
          tags: selectedTags,
        };

        const response = await axios.post(`${API_BASE_URL}/establishments/`, params);
        
        setEstablishments(response.data)

        const contentDiv = document.querySelector('.content');
        if (contentDiv) {
          contentDiv.scrollTo({top: 0, behavior: 'smooth'});
        }
      } catch (error) {
        console.error('Error fetching establishments', error);
      }
    };
    
    fetchEstablishments();
  }, [query, selectedTags, selectedCategories]);

  const generateColors = (numColors) => {
    return chroma.scale(["red", "blue"]).mode("lab").colors(numColors);
  }

  useEffect(() => {
    setColors(generateColors(tags.length));
  }, [tags])
  

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) => 
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category) ? prevCategories.filter((c) => c !== category) : [...prevCategories, category]
    );
  };

  return (
    <>
      <div className="min-h-screen bg-[#C2E1Cd]">
        <header className="flex flex-col items-center bg-[#12491C] text-white font-bold text-[85px]">
          <h1 className="-mb-5 -mt-2">San Mateo County</h1>
          <h2 className="mb-2">Community Resource Locator</h2>
        </header>
        
        <main className="">
          <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left Side */}
            <div className="flex-1 flex flex-col items-center mt-10 mx-6">
              <div className="flex md:flex-row items-center">
                <div className="flex flex-col items-center">
                  <p className="text-2xl font-bold p-2">Find Help in Your Community</p>

                  <div className="flex items-center space-x-4 p-2 w-full justify-center">
                    {/* Search Form */}
                    <form className="flex flex-1 max-w-md" onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="text"
                        placeholder="Search by name/keyword"
                        className="rounded bg-gray-50 h-10 flex-1 border border-gray-300 focus:outline-none px-2"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </form>

                    {/* MultiSelect Dropdown */}
                    <div className="flex-1">
                      <MultiSelectDropdown
                        categories={categories}
                        selectedCategories={selectedCategories}
                        toggleCategory={toggleCategory}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-2xl font-bold p-2">Service/Affiliation Tags</p>
              <div className="flex flex-wrap max-w-full justify-center">
                {tags.map((tag, i) => (
                  <button key={tag.id} onClick={() => toggleTag(tag.name)} 
                  className={`flex items-center space-x-2 rounded cursor-pointer transition-colors duration-200 ease m-1 px-4 py-2 border border-solid 
                  ${selectedTags.includes(tag.name) ? 'bg-blue-600 text-white border-blue-600' : 'bg-transparent border-gray-300 hover:bg-[#f0f0f047]'}`}> 
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{backgroundColor: colors[i]}}></span>
                    <span>{tag.name}</span>
                  </button>
                ))}
              </div>

            </div>
            

            {/* Right Side */}
            <div className="flex-1 flex flex-col rounded-[100px] outline outline-2 outline-black p-5 max-h-[80vh] overflow-y-auto mt-6 mx-6 mb-6">
              <div className="mb-4">
                <p className="text-2xl font-bold text-center">Found Resources</p>
                {noFiltersSelected && (
                  <p className="mt-1 text-center">
                    Please search, select a Service(s)/Affiliation(s), and/or choose a Program to see results
                  </p>
                )}
              </div>

              <div className="flex-1 w-full overflow-y-auto pr-2">
                {establishments.length > 0 ? (
                  establishments.map((establishment) => (
                    <div
                      key={establishment.id}
                      className="text-center transition-colors duration-[0.3s] ease-[ease] shadow-[5px_5px_5px_hsla(0,0%,0%,0.1)]
                                w-full box-border p-5 mb-4 border-2 border-blue-500 hover:bg-sky-200 rounded-lg"
                    >
                      <h4 className="break-words font-bold">{establishment.name}</h4>
                      <p><strong>Mission:</strong> {establishment.mission_statement}</p>
                      <p><strong>Phone:</strong> {establishment.phone_number}</p>
                      <p><strong>Email:</strong> <a href={`mailto:${establishment.email}`} className="break-all">{establishment.email}</a></p>
                      <p><strong>Website:</strong> <a href={establishment.website} target="_blank" rel="noopener noreferrer" className="break-all">{establishment.website}</a></p>
                      <p><strong>Location:</strong> {establishment.location}</p>
                      <p><strong>Hours:</strong> {establishment.hours_of_service}</p>
                    </div>
                  ))
                ) : !noFiltersSelected ? (
                  <p className="text-center">No results found for the selected filters.</p>
                ) : null}
              </div>
            </div>

          </div>

          <div className="">
            <Testimonials/>
          </div>
          
        </main>

        <footer className="mt-3">
          <Footer/>
        </footer>
      </div>
        
    </>
  )
}

export default App
