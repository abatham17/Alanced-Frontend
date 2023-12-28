import React, { useState, useEffect} from 'react'
import Navbar from '../../components/Layout/Navbar'
import HomeSection4 from '../../components/Layout/HomeSection4'
import Footer from '../../components/Layout/Footer'
import search from '../../components/images/SearchOutlined.png'
import verify from '../../components/images/verify.png'
import locations from '../../components/images/location.png'
import { useDispatch, useSelector } from 'react-redux'
import { Link , useLocation } from 'react-router-dom'
import mybg from '../../components/images/profile_list.png'
import { Avatar } from '@material-tailwind/react'
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios'
import SkillsList from '../freelancer/AllSelectionData/SkillsList'
import CityList from '../freelancer/AllSelectionData/CityList'
import LanguageList from '../freelancer/AllSelectionData/LanguageList'
import ExperienceLevel from '../freelancer/AllSelectionData/ExperienceLevel'
import Bag from '../../components/images/experience.png'

const FindTalent = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
   
    const [expe] = useState(ExperienceLevel);
    const [city] = useState(CityList)
    const [req_skill ] = useState(SkillsList)
    const [language] = useState(LanguageList)
   

    const [skillFilter, setSkillFilter] = useState([]);
    const [expFilter, setExpFilter] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [cityFilter, setCityFilter] = useState([]);
    const [languageFilter, setLanguageFilter] = useState([]);
    const [hourlyRate, setHourlyRate] = useState([1, 1000]);

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
  

    const handleSkillFilterChange = (e) => {
      const skills = e.target.value;
      if (e.target.checked){
       setSkillFilter((prevFilters) => [...prevFilters, skills]);
      } else {
       setSkillFilter((prevFilters) => prevFilters.filter((filter) => filter !== skills));
      }
      setCurrentPage(1);
     };
   
     const handleExpFilterChange = (e) => {
       const exp = e.target.value;
       if (e.target.checked){
         setExpFilter((prevFilters) => [...prevFilters, exp]);
       } else {
         setExpFilter((prevFilters) => prevFilters.filter((filter) => filter !== exp));
       }
       setCurrentPage(1);
     };

     const handleCityFilterChange = (e) => {
      const city = e.target.value;
      if (e.target.checked) {
          setCityFilter((prevFilters) => [...prevFilters, city]);
      } else {
          setCityFilter((prevFilters) => prevFilters.filter((filter) => filter !== city));
      }
      setCurrentPage(1);
  };

  const handleLanguageFilterChange = (e) => {
    const language = e.target.value;
    if (e.target.checked){
     setLanguageFilter((prevFilters) => [...prevFilters, language]);
    } else {
     setLanguageFilter((prevFilters) => prevFilters.filter((filter) => filter !== language));
    }
    setCurrentPage(1);
   };
  
    const [viewFreelancer, setViewFreelancer] = useState([]);
    console.log(viewFreelancer,"freelancers by axios")

  useEffect(() => {
    const queryParameters = [];


    if (skillFilter.length > 0) {
      queryParameters.push(`skills=${skillFilter.join('&skills=')}`);
    }

    if (expFilter.length > 0) {
      queryParameters.push(`experience_level=${expFilter.join('&experience_level=')}`);
    }

    if (cityFilter.length > 0) {
      queryParameters.push(`Address=${cityFilter.join('&Address=')}`);
    }

    if (searchQuery) {
      queryParameters.push(`search_query=${searchQuery}`);
    }
    
    if (languageFilter.length > 0) {
      queryParameters.push(`Language=${languageFilter.join('&Language=')}`);
    }

    queryParameters.push(`page=${currentPage}`);

    const queryString = queryParameters.join('&');

    axios
      .get(`https://www.api.alanced.com/account/freelancer/profile/view-all/?${queryString}`)
      .then((response) => {
        setViewFreelancer(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 8));
      })
      .catch((error) => {
        console.error('Error fetching filtered data:', error);
      });
  }, [skillFilter, expFilter, searchQuery, cityFilter, languageFilter , currentPage]);


      

    const [range, setRange] = useState([1, 1000]);

    const handleSliderChange = (newRange) => {
        setRange(newRange);
    };
    
    const handleInputChange = (index, newValue) => {
        const updatedRange = [...range];
        updatedRange[index] = Number(newValue);  
        setRange(updatedRange);
    };
  
    const [showMoreSkills, setShowMoreSkills] = useState({});

    // Define the toggleShowMoreSkills function
    const toggleShowMoreSkills = (freelancerId) => {
        setShowMoreSkills((prevShowMoreSkills) => ({
            ...prevShowMoreSkills,
            [freelancerId]: {
                showAll: !prevShowMoreSkills[freelancerId]?.showAll,
            },
        }));
    };


    const [showMoreDes, setShowMoreDes] = useState({});

    const toggleShowMoreDes = (freelancerId) => {
        setShowMoreDes((prevShowMoreDes) => ({
            ...prevShowMoreDes,
            [freelancerId]: {
                showAllDes: !prevShowMoreDes[freelancerId]?.showAllDes,
            },
        }));
    };
    

    const getDisplayedText = (text, showAll) => {
        if (showAll) return text;
    
        const words = text.split(' ');
        if (words.length <= 20) return text;
    
        return words.slice(0, 20).join(' ') + '...';
    };
    

    const [showAllSkills, setShowAllSkills] = useState(false);
    const initialSkillCount = 5; // Initial number of skills to show

    const [visibleSkills, setVisibleSkills] = useState(req_skill.slice(0, initialSkillCount));

    const handleShowMoreSkills = () => {
      setVisibleSkills(req_skill); // Show all skills
      setShowAllSkills(true);
    };

    const handleShowLessSkills = () => {
      setVisibleSkills(req_skill.slice(0, initialSkillCount)); // Show the initial count
      setShowAllSkills(false);
    };


    
    const [showAllCity, setShowAllCity] = useState(false);
    const initialCityCount = 5; // Initial number of cities to show

    const [visibleCities, setVisibleCities] = useState(city.slice(0, initialCityCount));

    const handleShowMoreCity = () => {
      setVisibleCities(city); // Show all cities
      setShowAllCity(true);
    };

    const handleShowLessCity = () => {
      setVisibleCities(city.slice(0, initialCityCount)); // Show the initial count
      setShowAllCity(false);
    };


    const [showAllLanguage, setShowAllLanguage] = useState(false);
    const initialLanguageCount = 5; // Initial number of language to show

    const [visibleLanguages, setVisibleLanguages] = useState(language.slice(0, initialLanguageCount));

    const handleShowMoreLanguage = () => {
      setVisibleLanguages(language); // Show all Languages
      setShowAllLanguage(true);
    };

    const handleShowLessLanguage = () => {
      setVisibleLanguages(language.slice(0, initialLanguageCount)); // Show the initial count
      setShowAllLanguage(false);
    };
    
   
    function highlightText(text, query) {
      if (!query) {
        return text;
      }
    
      const regex = new RegExp(`(${query})`, 'gi');
      return text.split(regex).map((part, index) => {
        if (index % 2 === 1) {
          return <span key={index} style={{ backgroundColor: '#a3e635' }}>{part}</span>;
        } else {
          return <span key={index}>{part}</span>;
        }
      });
    }

    const prev = () => {
      window.scrollTo(0, 0);
      setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const next = () => {
      window.scrollTo(0, 0);
      setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

    return (
      <>
      <Navbar/>
      <div className="h-[43vh] bg-no-repeat -mt-[1.3rem] bg-contain" style={{ backgroundImage: `url(${mybg})` }}>
        <div className='text-left pt-[3rem] ml-[13.5vw] text-2xl font-cardo'>
          <h1>Find & Hire Freelancers</h1>
          <p className='font-inter text-sm text-[#797979] font-normal mt-2'>More than 10K expert freelancers are waiting for you</p>
          <div className='lg:w-[44vw] bg-white p-3 lg:h-14 rounded-2xl lg:flex items-center mt-4 shadow-md'>
            <div className='flex flex-row'>
              <img className='w-5 h-5' src={search}></img>
              <input className='w-96 font-inter text-base ml-3 outline-none' placeholder='Search by Category' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
            </div>
            <div className=''>
              <button className='rounded h-8 w-24 lg:ml-6 font-semibold text-base text-white bg-gradient-to-r from-[#00BF58] to-[#E3FF75]'>Search</button>
            </div>
          </div>
        </div>
      </div>
      <div className=' mt-1 mx-[9%]'>
      <div class="flex flex-col md:flex-row mb-5 mx-5">
  <div class="w-full md:w-[30%] pt-3 bg-[#FFFFFF] py-8 border-l border-b border-gray-200 border-opacity-30 text-left">
  <div class='skills'>
  <div><h1 className='font-cardo text-xl text-left font-normal'>Skills</h1></div>
        {visibleSkills.map((skill,index) => (
          <div key={skill} className='flex flex-row mt-4'>
          <div className='basis-8/12'>
              <label className="flex items-center font-inter relative cursor-pointer">
                  <input 
        className="hidden" 
        type="checkbox"
        value={skill}
        onChange={handleSkillFilterChange}
      />
                  <div className="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                      <span className="checkmark hidden"><i className="bi bi-check-lg pr-2 pt-2"></i></span>
                  </div>
                  <span className="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span className="font-normal text-[#797979]">{skill}</span>
              </label>
          </div>
          {/* <div className='basis-4/12 font-inter text-base font-normal text-[#797979] text-left'>
              (21)
          </div> */}
      </div>
        ))}
        {showAllSkills ? (
        <div>
          <h1 className='font-cardo text-xl text-left mt-5 font-normal cursor-pointer' onClick={handleShowLessSkills}>
            Show Less
          </h1>
        </div>
      ) : (
        <div>
          <h1 className='font-cardo text-xl text-left mt-5 font-normal cursor-pointer' onClick={handleShowMoreSkills}>
            +{req_skill.length - initialSkillCount} More
          </h1>
        </div>
          )}
  </div>
  {/* <div><h1 className='font-cardo text-xl text-left font-normal mt-10'>Freelancer Rate</h1></div>
  <div className="pt-4 w-[75%]">
              <Slider
                min={1}
                max={1000}
                step={1}
                range
                value={range}
                onChange={handleSliderChange}
                railStyle={{ background: 'lightgray' }}
                trackStyle={[
                  {
                    background: 'linear-gradient(45deg, #00BF58, #E3FF75)',
                    borderColor: '#65a30d',
                  },
                ]}
                handleStyle={[
                  {
                    backgroundColor: 'white',
                    borderColor: 'transparent', 
                    borderRadius: '50%', // Set border radius for circular shape
                    borderImage: 'linear-gradient(45deg, #00BF58, #E3FF75)',
                    borderImageSlice: 1,
                  },
                  {
                    backgroundColor: 'white',
                    borderColor: 'transparent',
                    borderRadius: '50%',
                    borderImage: 'linear-gradient(45deg, #00BF58, #E3FF75)',
                    borderImageSlice: 1,
                  },
                ]}
                />
              <div className='flex flex-row mt-4'>
                <div className='basis-5/12'><input
                type="text"
                value={range[0]}
                onChange={(e) => handleInputChange(0, e.target.value)}
                className='mt-3 bg-white text-center border rounded-md p-1 basis-6/12 font-inter text-base font-normal text-[#797979] w-24 focus:border-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-60
                focus:outline-none'
              /></div>
              <div className='basis-2/12 m-auto mt-4 text-center'><i class="bi bi-dash-lg text-[#475569]"></i></div>
                <div className='basis-5/12'><input
                type="text"
                value={range[1]}
                onChange={(e) => handleInputChange(1, e.target.value)}
                className='mt-3 bg-white text-center border rounded-md p-1 basis-6/12 font-inter text-base font-normal text-[#797979] w-24 focus:border-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-60
                focus:outline-none'
              /></div>
              </div>
            </div> */}
    <div class='location'>
    <div><h1 className='font-cardo text-xl text-left font-normal mt-10'>Citys</h1></div>
    
      {visibleCities.map((location,index) => (
        <div key={location} className='flex flex-row mt-4'>
        <div className='basis-8/12'>
          <label className="flex items-center font-inter relative cursor-pointer">
            <input 
              className="hidden" 
              type="checkbox"
              value={location}
              onChange={handleCityFilterChange}
            />
            <div className="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
              <span className="checkmark hidden"><i className="bi bi-check-lg pr-2 pt-2"></i></span>
            </div>
            <span className="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
            <span className="font-normal text-[#797979]">{location}</span>
          </label>
        </div>
        {/* <div className='basis-4/12 font-inter text-base font-normal text-[#797979] text-left'>
          (5)
        </div> */}
      </div>
      ))}
      {showAllCity ? (
              <div>
                <h1 className='font-cardo text-xl text-left mt-5 font-normal cursor-pointer' onClick={handleShowLessCity}>
                  Show Less
                </h1>
              </div>
            ) : (
              <div>
                <h1 className='font-cardo text-xl text-left mt-5 font-normal cursor-pointer' onClick={handleShowMoreCity}>
                  +{city.length - initialCityCount} More
                </h1>
              </div>
            )}
    </div>
    <div class='language'>
    <div><h1 className='font-cardo text-xl text-left font-normal mt-10'>Languages</h1></div>
        {visibleLanguages.map((language, index) =>(
          <div key={language} className='flex flex-row mt-4'>
          <div className='basis-8/12'>
              <label className="flex items-center font-inter relative cursor-pointer">
                  <input 
                  className="hidden" 
                  type="checkbox"
                  value={language}
                  onChange={handleLanguageFilterChange}
                    />
                  <div className="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                      <span className="checkmark hidden"><i className="bi bi-check-lg pr-2 pt-2"></i></span>
                  </div>
                  <span className="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
                  <span className="font-normal text-[#797979]">{language}</span>
              </label>
          </div>
          {/* <div className='basis-4/12 font-inter text-base font-normal text-[#797979] text-left'>
              (22)
          </div> */}
      </div>
        ))}
        {showAllLanguage ? (
              <div>
                <h1 className='font-cardo text-xl text-left mt-5 font-normal cursor-pointer' onClick={handleShowLessLanguage}>
                  Show Less
                </h1>
              </div>
            ) : (
              <div>
                <h1 className='font-cardo text-xl text-left mt-5 font-normal cursor-pointer' onClick={handleShowMoreLanguage}>
                  +{language.length - initialLanguageCount} More
                </h1>
              </div>
            )}
    </div>
    <div class='level'>
    <div><h1 className='font-cardo text-xl text-left font-normal mt-10'>Experience Level</h1></div>
    {expe.map((exp,index) => (
      <div key={exp} className='flex flex-row mt-4'>
      <div className='basis-8/12'>
          <label class="flex items-center font-inter relative cursor-pointer">
              <input 
        className="hidden" 
        type="checkbox"
        value={exp}
        onChange={handleExpFilterChange}
      />
              <div class="checkbox-border-gradient bg-transparent mr-3 w-5 h-5 rounded flex items-center justify-center">
                
                  <span class="checkmark hidden"><i class="bi bi-check-lg pr-2 pt-2"></i></span>
              </div>
                   <span class="normal-checkbox mr-3 border border-gray-300 w-5 h-5 inline-block rounded"></span>
              <span class="font-normal text-[#797979]">{exp}</span>
          </label>
      </div>
      {/* <div className='basis-4/12 font-inter text-base font-normal text-[#797979] text-left'>(23)</div> */}
  </div>
    ))}
    </div>
  </div>
  
  <div class="w-full md:w-[70%] pt-3 bg-[#FFFFFF] py-8 border border-gray-200 border-opacity-30 text-left">
      <div className='px-4 md:px-8 pt-4 border-b border-gray-200 border-opacity-30'>
      <div className="flex items-center">
      <h1  className="font-cardo text-[21px] text-[#031136] font-normal mr-1">Freelancers that Matches your Job</h1>
      </div>
      <div class="w-40  mt-3 relative">
      <div class="absolute inset-0 bg-gradient-to-r from-[#00BF58] to-[#E3FF75] rounded-lg"></div>
      <div class="border-gray-600 border-b-2 rounded-lg"></div>
    </div>   
      </div>
      {viewFreelancer != null ? (
        viewFreelancer.length > 0 ? (
          <div className='grid md:grid-cols-2 grid-cols-1 w-full pl-3.5'>
      {viewFreelancer && viewFreelancer.map((free, index) => {
                return(<>
                
      <div className='px-4 md:w-[26vw] relative flex-shrink-0 md:px-8 py-5 hover:bg-[#F6FAFD] border-t border-b border-gray-200 border-opacity-30 cursor-pointer shadow-lg rounded-lg mt-4'>
        <div className="flex items-center">
            <Avatar src={"https://www.api.alanced.com"+free.images_logo} alt="" variant="rounded" className="mr-4 h-24 w-24" />
            <div>
            <p className="font-inter text-[#0A142F] text-[18px] font-semibold">{highlightText(free.first_Name + " " + free.last_Name, searchQuery)}</p>
            <p className='font-inter opacity-50 text-[#0A142F] text-[14px]'>{highlightText(free.category,searchQuery)}</p>
        </div>
        </div>
        <div>
        <p className='font-inter opacity-50 text-[#0A142F] text-[14px] pt-4 inline-block'>
    {highlightText(getDisplayedText(free.about, showMoreDes[free.id]?.showAllDes), searchQuery)}
</p>
{free.about && free.about.split(' ').length > 20 && (
    <button
        onClick={() => toggleShowMoreDes(free.id)}
        className='font-inter text-green-600 text-[14px] cursor-pointer font-bold inline-block mb-2'
    >
        {showMoreDes[free.id] && showMoreDes[free.id].showAllDes ? 'See Less' : 'See More'}
    </button>
)}</div>

  {free.skills &&
                    JSON.parse(free.skills.replace(/'/g, '"')).map((skill, skillIndex) => (
                        <Link to={''} key={skillIndex}>
                            <span
                                className={`border px-4 py-1 border-gray-300 opacity-50 rounded font-inter text-[#0A142F] text-[13px] inline-block mr-2 my-2 ${
                                    skillIndex < 4 || (showMoreSkills[free.id] && showMoreSkills[free.id].showAll)
                                        ? ''
                                        : 'hidden'
                                }`}
                            >
                                {highlightText(skill,searchQuery)}
                            </span>
                        </Link>
                    ))}
                {free.skills &&
                    JSON.parse(free.skills.replace(/'/g, '"')).length > 4 && (
                        <button
                            onClick={() => toggleShowMoreSkills(free.id)}
                            className='font-inter text-green-600 text-[14px] cursor-pointer font-bold'
                        >
                            {showMoreSkills[free.id] && showMoreSkills[free.id].showAll ? ' Less' : ' More'}
                        </button>
                    )}
  
            <div className='mb-12'>
          {/* <p className='font-inter text-[#0A142F] text-[14px] py-1 mr-1'>completed projects : <span className='opacity-50'>More than 50</span></p> */}
          <img src={verify} alt="" className='inline-block h-3 w-3 mr-1'/>
          <p className='font-inter text-[#0A142F] text-[14px] opacity-50 inline-block'>Account verified</p>
          <div className="text-[16px] text-[#FFC107] inline-block mx-3">★★★★★</div>
          <p className='font-inter text-[#0A142F] text-[14px] opacity-80 inline-block mr-1'>${free.hourly_rate ? free.hourly_rate:0}/Hr</p>
          <p className='font-inter text-[#0A142F] text-[14px] opacity-50 inline-block mr-3'>Hourly Rate</p>
          <p className='font-inter text-[#0A142F] text-[14px] opacity-50 inline-block mr-2'>{highlightText(free.experience_level.replace(/_/g, ' '),searchQuery)}</p>
          <img src={locations} alt="" className='inline-block h-3 w-3 mr-1'/>
          <p className='font-inter text-[#0A142F] text-[14px] opacity-50 inline-block'>{highlightText(free.Address ? free.Address : 'NA', searchQuery)}</p>
          </div>
         
        <div className=' flex flex-row'>
            <div className=' basis-8/12 absolute bottom-4 items-center font-inter text-green-600 text-[14px] cursor-pointer font-bold hover:underline'><Link to='/view-freelancer/detail' state={{ free }} onClick={() => window.scroll(0, 0) }><p>View more detail</p></Link></div>
            <div className=' basis-4/12 absolute bottom-2 right-6 items-center space-x-2 ml-auto'><Link to='/login'>
            <span className="inline-block text-sm px-4 py-[10px] mt-4 lg:mt-0 bg-gradient-to-r from-[#00BF58] to-[#E3FF75] border rounded border-none text-white font-semibold">Hire Now</span>
        </Link></div>
        </div>
      </div>
      
      </>
      )
      })}
  
  </div>
        ):(
          <div className=' mt-20'>
                <img src={Bag} alt=""  className='w-[18%] mx-auto'/>
                <p className=' mt-5 font-cardo text-xl opacity-70 text-center'>There are no results that match your search.</p>
                <p className=' mt-3 font-cardo text-sm opacity-60 text-center'>Please try adjusting your search keywords or filters.</p>
              </div>
        )
       ): (
  <div className='grid grid-cols-2 w-[70%] md:w-full pl-3.5'>
    {[...Array(6)].map((_) => {
      return (
    <div className='px-4 w-[26vw] h-[467px] relative flex-shrink-0 md:px-8 py-5 hover:bg-[#F6FAFD] border-t border-b border-gray-200 border-opacity-30 cursor-pointer shadow-lg rounded-lg mt-4'>
      <Skeleton height={90} width={90} inline={true} style={{borderRadius:'10%', float: 'left'}}/>
      <Skeleton height={20} width={200} style={{marginLeft:10, marginTop:20}}/>
      <Skeleton height={20} width={200} style={{marginLeft:10, marginTop:10}}/>
      <Skeleton height={200} width={300} style={{marginTop:20}}/>
      <Skeleton height={50} width={200} style={{marginTop:10}}/>
      <Skeleton height={35} width={80} style={{marginTop:20, float: 'right'}}/>
      
    </div>);})}
  </div>
    )}
  <div>
  {totalPages > 1 && (
                    <div className="flex justify-end items-center gap-6 m-4">
                        <IconButton
                            size="sm"
                            variant="outlined"
                            onClick={prev}
                            disabled={currentPage === 1}
                            style={{ backgroundImage: 'linear-gradient(45deg, #00BF58, #E3FF75)', border: 'none' }}
                        >
                            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-white" />
                        </IconButton>
                        
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <span
                                    key={pageNumber}
                                    className={`px-0 py-1 ${currentPage === pageNumber ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#00BF58] to-[#E3FF75] font-bold font-inter text-[14px] cursor-pointer' : 'text-[#0A142F] font-bold font-inter text-[14px] cursor-pointer'}`}
                                    onClick={() => {
                                        window.scrollTo(0, 0);
                                        setCurrentPage(pageNumber);
                                    }}
                                    
                                >
                                    {pageNumber}
                                </span>
                            );
                        })}

                        <IconButton
                            size="sm"
                            variant="outlined"
                            onClick={next}
                            disabled={currentPage === totalPages}
                            style={{ backgroundImage: 'linear-gradient(45deg, #00BF58, #E3FF75)', border: 'none' }}
                        >
                            <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-white" />
                        </IconButton>
                    </div>
    )}
  
  </div>
  </div>
  </div>
      </div>
      <HomeSection4/>
      <Footer/>
      </>
    )
}

export default FindTalent
