import React, { useState } from 'react'
import Navbar from '../../components/Layout/Navbar'
import HomeSection4 from '../../components/Layout/HomeSection4'
import Footer from '../../components/Layout/Footer'
import profilebg from '../../components/images/profilebg.png'
import search from '../../components/images/SearchOutlined.png'
import certifybadge from '../../components/images/certifybadge.png'
import ladder from '../../components/images/ladder.png'
import bag from '../../components/images/bag.png'
import downarrow from '../../components/images/downarrow.png'
import thumbdown from '../../components/images/thumbdown.png'
import heart from '../../components/images/heart.png'
import verify from '../../components/images/verify.png'
import location from '../../components/images/location.png'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ViewProjectPopup from './AllPopup/ViewProjectPopup'
import { GetViewAllProjectsListAction } from '../../redux/Freelancer/FreelancerAction'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";


const FreelancerAfterLogin = () => {

  const logindata = useSelector(state => state.login.login_data);  
  const googleUserName = localStorage.getItem('googleUserName')
  const loginMethod = localStorage.getItem('loginMethod')
  const viewallprojects = useSelector(state => state.freelancer.viewallprojects)
  const accessToken = useSelector(state => state.login.accessToken);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
 

  React.useEffect(() => {
    dispatch(GetViewAllProjectsListAction())
  }, [])

  let displayName;

  if (loginMethod === 'google') {
      displayName = googleUserName;
  } else if (loginMethod === 'traditional') {
      displayName = logindata?.first_Name +" " +logindata?.last_Name;
  }

  const filteredProjects = viewallprojects ? viewallprojects.filter(project => project.category === logindata?.category) : [];

  // New filter based on the search term
  const searchFilteredProjects = filteredProjects.filter(project => {
    const skills = JSON.parse(project.skills_required.replace(/'/g, '"'));
    return (
      skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const projectsToDisplay = searchFilteredProjects.length > 0 ? searchFilteredProjects : viewallprojects;

//***    const filteredProjects = viewallprojects ? viewallprojects.filter(project => project.category === logindata?.category) : [];

//   const projectsToDisplay = filteredProjects.length > 0 ? filteredProjects : viewallprojects;****

//   const filteredProjects = viewallprojects ? viewallprojects.filter(project => project.category === logindata.category) : [];

  const [expandedProjects, setExpandedProjects] = useState([]);

const handleToggleDescription = (index) => {
    const updatedState = [...expandedProjects];
    updatedState[index] = !updatedState[index];
    setExpandedProjects(updatedState);
};

//   const handleClick = (event) => {
//     event.stopPropagation();
// };
const handleClick = (event, index) => {
    event.stopPropagation();

    handleToggleDescription(index);

    // Rest of your handleClick code, if any...
};
 
  const [selected, setSelected] = useState('Best Matches');
  const underlineStyle = {
    content: '""',
    display: 'block',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '2px',
    background: 'linear-gradient(90deg, #00BF58, #E3FF75)'
  };

  function getCurrentDateAndGreeting() {
    const current = new Date();
    const hours = current.getHours();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let greeting;
    if (hours < 12) {
        greeting = 'Morning';
    } else if (hours < 17) {
        greeting = 'Afternoon';
    } else {
        greeting = 'Evening';
    }

 
    const dateOfMonth = current.getDate();
    function getOrdinalSuffix(date) {
        if (date > 3 && date < 21) return 'th'; 
        switch (date % 10) {
            case 1:  return 'st';
            case 2:  return 'nd';
            case 3:  return 'rd';
            default: return 'th';
        }
    }

    const formattedDate = `${months[current.getMonth()]} ${dateOfMonth}${getOrdinalSuffix(dateOfMonth)}`;
    return {
        day: days[current.getDay()],
        formattedDate,
        greeting
    };
}
      
const { day, formattedDate, greeting } = getCurrentDateAndGreeting();


const calculateTimeAgo = (projectCreationDate) => {
    const currentDate = new Date();
    const creationDate = new Date(projectCreationDate);
    const timeDifference = currentDate - creationDate;

    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursAgo = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutesAgo = Math.floor((timeDifference / 1000 / 60) % 60);

    if (daysAgo > 0) {
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    } else if (hoursAgo > 0) {
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else {
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    }
  };

const [isDialogOpen, setIsDialogOpen] = useState(false);
const [selectedProject, setSelectedProject] = useState(null);

const openDialog = (project) => {
    setSelectedProject(project); 
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedProject(null); 
    setIsDialogOpen(false);
  };

  const [AllProposals, setAllProposals] = useState('')

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch doc API
        const response1 = await axios.get('https://aparnawiz91.pythonanywhere.com/freelance/view/freelancer-self/bid',{
          headers: {
            "Authorization":`Bearer ${accessToken}`
          }
        });
        setAllProposals(response1.data.data);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); 
  }, []);
  console.log("/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/",AllProposals)

  const [active, setActive] = React.useState(1);
 
  const next = () => {
      if (active === Math.ceil(projectsToDisplay.length / 10)) return;
      window.scrollTo(0, 0)
      setActive(active + 1);
  };

  const prev = () => {
      if (active === 1) return;
      window.scrollTo(0, 0)
      setActive(active - 1);
  };
  
 // 1. Chunk the Array
 const chunkArray = (array, size) => {
  let chunked = [];
  if(viewallprojects != null){
  for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
  }
}
  return chunked;
}

const chunkedFree = chunkArray(projectsToDisplay, 10);
  
  return (
    <>
    <Navbar/>
    <div className='mt-1 mx-[9%]'>
    <div className="relative">
    <img src={profilebg} alt="" className='w-full h-52' />
    <div className="absolute top-12 left-12 p-4 text-left">
        <h1 className='font-cardo text-[#031136] sm:text-xl text-lg font-normal'>{day}, {formattedDate}</h1>
        <h1 className='font-cardo text-[#031136] sm:text-3xl text-2xl font-semibold py-1'>Good {greeting}, {displayName}</h1>
    </div>
</div>
{/* <section className='flex justify-center my-2'>
    <div className='sm:w-[78vw] w-[95vw] bg-white p-1 sm:h-16 rounded-md flex justify-between items-center shadow-md relative z-10'>
        <div className='flex flex-row items-center p-4'>
            <img src={search} className="h-4 w-4" alt=""/>
            <input className='w-52 sm:w-[800px] ml-2 h-8 text-sm outline-none' placeholder='What are you looking for?' />
        </div>
        <button className='rounded h-8 w-20 sm:w-24 mr-3 font-semibold text-white bg-gradient-to-r from-[#00BF58] to-[#E3FF75]'>Search</button>
    </div>
</section> */}

{/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 mt-5">
    <div className="grid grid-cols-2 gap-2 bg-[#E2F9EE] rounded-lg p-4 shadow-sm">
        <div>
           <h1 className='font-cardo text-[16px] text-[#031136] text-left'>Import A Certification</h1>
           <p className='font-inter text-[12px] text-[#0A142F] opacity-50 py-2 text-left'>Showing a credential may increase your chances of earning by 4 times.</p>
        </div>
        <div className="text-center">
            <i class="bi bi-arrow-right"></i>
            <img src={certifybadge} alt="" className='mx-auto h-14 w-14 mt-2'/>
        </div>
    </div>
    <div className="grid grid-cols-2 gap-2 bg-[#E2F9EE] rounded-lg p-4 shadow-sm">
        <div>
        <h1 className='font-cardo text-[16px] text-[#031136] text-left'>Get Tips To Find Work</h1>
           <p className='font-inter text-[12px] text-[#0A142F] opacity-50 py-2 text-left'>Learn how to optimize search, use Connects, and more to land your first job.</p>
        </div>
        <div className="text-center">
            <i class="bi bi-arrow-right"></i>
            <img src={ladder} alt="" className='mx-auto h-14 w-14 mt-2'/>
        </div>
    </div>
    <div className="grid grid-cols-2 gap-2 rounded-lg p-4 relative z-10 shadow-sm">
        <div>
        <h1 className='font-cardo text-[16px] text-[#031136] text-left'>My Jobs</h1>
           <p className='font-inter text-[12px] text-[#0A142F] opacity-50 py-2 text-left'>View your active contracts, timesheets, and available earnings.</p>
        </div>
        <div className="text-center">
            <i class="bi bi-arrow-right"></i>
            <img src={bag} alt="" className='mx-auto h-14 w-14 mt-2'/>
        </div>
    </div>
</div> */}
<div class="flex flex-col md:flex-row mb-5 mx-5">
<div class="w-full md:w-[30%] pt-3 bg-[#FFFFFF] py-8 border-l border-b border-gray-200 border-opacity-30 text-left">
  <Link to='/saved-jobs' onClick={() => window.scrollTo(0, 0)}>
<div className="flex items-center justify-between border-b border-gray-200 border-opacity-30 px-4 md:px-8 py-4 hover:bg-[#E2F9EE] rounded-2xl">
    <h1 className="font-cardo text-xl text-[#031136] font-normal mr-1">Saved Jobs</h1>
    <div className="flex items-center space-x-2 text-green-600 mr-5">
            <i class="bi bi-heart"></i>
            {/* <i class="bi bi-heart-fill"></i> */}
    </div>
    </div></Link>
    <Link to='/my-proposals' onClick={() => window.scrollTo(0, 0)}>
    <div className="flex items-center justify-between border-b border-gray-200 border-opacity-30 px-4 md:px-8 py-4 hover:bg-[#E2F9EE] rounded-2xl">
    <h1 className="font-cardo text-xl text-[#031136] font-normal mr-1">Proposals</h1>
    <div className="flex items-center space-x-2 text-green-600 mr-5">
            <i class="bi bi-send-check"></i>
            {/* <i class="bi bi-send-check-fill"></i> */}
    </div>
    </div></Link>
    {/* <Link to='/freelancer/edit-profile#certificate'>
    <div className="flex items-center justify-between border-b border-gray-200 border-opacity-30 px-4 md:px-8 py-4 hover:bg-[#E2F9EE] rounded-2xl">
    <h1 className="font-cardo text-xl text-[#031136] font-normal mr-1">Project catalog</h1>
    <div className="flex items-center space-x-2 text-green-600 mr-5">
            <i class="bi bi-folder-symlink"></i>
           
    </div>
    </div></Link> */}
    <div className="flex items-center justify-between border-b border-gray-200 border-opacity-30 px-4 md:px-8 py-4 hover:bg-[#E2F9EE] rounded-2xl">
    <h1 className="font-cardo text-xl text-[#031136] font-normal mr-1">Get Paid</h1>
    <div className="flex items-center space-x-2 text-green-600 mr-5">
            {/* <img src={downarrow} alt="" /> */}
            <i class="bi bi-coin"></i>
    </div>
    </div>
    {/* <div className="px-4 md:px-8 py-5 m-4 rounded-lg shadow-md">
    <h1 className="font-cardo text-[18px] text-[#031136] font-normal pt-2">Upwork Academy  <i class="bi bi-box-arrow-up-right text-sm"></i></h1>
    <h1 className="font-cardo text-[18px] text-[#031136] font-normal pt-2">Get Paid  <i class="bi bi-box-arrow-up-right text-sm"></i></h1>
    <h1 className="font-cardo text-[18px] text-[#031136] font-normal pt-2">Community & Forums  <i class="bi bi-box-arrow-up-right text-sm"></i></h1>
    <h1 className="font-cardo text-[18px] text-[#031136] font-normal py-2">Help Center  <i class="bi bi-box-arrow-up-right text-sm"></i></h1>
    </div> */}
    {/* <Link to='/freelancer/edit-profile#certificate'>
    <div className="grid grid-cols-[2fr,1fr] gap-2 bg-[#E2F9EE] rounded-lg p-4 mx-4 shadow-sm">
    <div>
        <h1 className='font-cardo text-lg text-[#031136] text-left'>Import A Certification</h1>
        <p className='font-inter text-sm text-[#0A142F] opacity-50 py-2 text-left'>Showing a credential may increase your chances of earning by 4 times.</p>
    </div>
    <div className="text-center">
       <i class="bi bi-arrow-right"></i>
        <img src={certifybadge} alt="" className='mx-auto h-16 w-16 mt-2'/>
    </div>
</div></Link> */}
<Link to='/projects' onClick={() => window.scrollTo(0, 0)}>
    <div className="grid grid-cols-[2fr,1fr] gap-2 bg-[#E2F9EE] rounded-lg p-4 mx-4 my-3 shadow-sm">
        <div>
        <h1 className='font-cardo text-lg text-[#031136] text-left'>Get Tips To Find Work</h1>
           <p className='font-inter text-sm text-[#0A142F] opacity-50 py-2 text-left'>Learn to optimize search, use Connects, and land your first job.</p>
        </div>
        <div className="text-center">
            <i class="bi bi-arrow-right"></i>
            <img src={ladder} alt="" className='mx-auto h-16 w-16 mt-2'/>
        </div>
    </div></Link>
    <Link to='/my-jobs' onClick={() => window.scrollTo(0, 0)}>
    <div className="grid grid-cols-[2fr,1fr] gap-2 bg-[#E2F9EE] rounded-lg p-4 mx-4 relative z-10 shadow-sm">
        <div>
        <h1 className='font-cardo text-lg text-[#031136] text-left'>My Jobs</h1>
           <p className='font-inter text-sm text-[#0A142F] opacity-50 py-2 text-left'>View your active contracts, timesheets, and available earnings.</p>
        </div>
        <div className="text-center">
        <i class="bi bi-arrow-right"></i>
            <img src={bag} alt="" className='mx-auto h-16 w-16 mt-2'/>
        </div>
    </div>
    </Link>
</div>
{/* {viewallprojects != null ?  */}
<div class="w-full md:w-[70%] pt-3 bg-[#FFFFFF] py-8 border border-gray-200 border-opacity-30 text-left">
    <div className='px-4 md:px-8 pt-4 border-b border-gray-200 border-opacity-30'>
    {/* <h1 className="font-cardo text-[21px] text-[#031136] font-normal mr-1">Jobs You Might Like</h1> */}
    <div className="flex justify-between items-center">
    <div className="flex items-center">
    <h1  className="font-cardo text-[21px] text-[#031136] font-normal mr-1">Jobs You Might Like</h1>
    </div>
    <div className="flex items-center">
    <div className='flex items-center mr-1 space-x-1 border p-1 w-[200px] rounded-md'>
        <img src={search} alt="Search Icon" className="h-4 w-4 mr-1 ml-1" />
        <input className='w-28 lg:w-40 xl:w-[160px] h-7 text-sm lg:text-sm outline-none' placeholder='Search Jobs' value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
    </div>
</div>
    {/* <p 
        className={`font-inter opacity-50 text-[#0A142F] text-[13px] py-2 inline-block pr-10 relative cursor-pointer`} 
        onClick={() => setSelected('Best Matches')}
    >
        Best Matches
        {selected === 'Best Matches' && <span style={underlineStyle}></span>}
    </p>

    <p 
        className={`font-inter opacity-50 text-[#0A142F] text-[13px] py-2 inline-block pr-10 relative cursor-pointer`} 
        onClick={() => setSelected('Most Recent')}
    >
        Most Recent
        {selected === 'Most Recent' && <span style={underlineStyle}></span>}
    </p>
    <p 
        className={`font-inter opacity-50 text-[#0A142F] text-[13px] py-2 inline-block relative cursor-pointer`} 
        onClick={() => setSelected('Saved Jobs')}
    >
        Saved Jobs
        {selected === 'Saved Jobs' && <span style={underlineStyle}></span>}
    </p> */}
    </div>
    <div className='px-4 md:px-8 py-2'>
      <p className='font-inter opacity-50 text-[#0A142F] text-[13px]'>Browse jobs that match your experience to a client's hiring preferences.<br/> Ordered by most relevant.</p>
    </div>
    {viewallprojects != null ?
    <div>
    {chunkedFree[active - 1] && chunkedFree[active - 1].map((project, index) => {
        const timeAgo = calculateTimeAgo(project.project_creation_date);
    {/* {filteredProjects && filteredProjects.map((project, index) => { */}
    {/* {viewallprojects && <>{viewallprojects.map((project,index)=> { */}
        const words = project.description.split(' ');
        const displayWords = expandedProjects[index] || words.length <= 50 ? words : words.slice(0, 50);
              return(<>
    <Link to='/view-project/full-detail' state={{ project }} onClick={() => window.scrollTo(0, 0)}>
    <div className='px-4 md:px-8 py-5 hover:bg-[#F6FAFD] border-t border-b border-gray-200 border-opacity-30 cursor-pointer'>
    <div className="flex items-center justify-between">
    <p className="font-inter text-[#0A142F] text-[18px] font-semibold">{project.title}</p>
    <div className="flex items-center space-x-2">
        {/* <div className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200" onClick={handleClick}>
            <img src={thumbdown} alt="" />
        </div> */}
        <div className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200" onClick={handleClick}>
            <img src={heart} alt="" />
        </div>
    </div>
    </div>
    {AllProposals && AllProposals.map((all, proposal) => {
        return(
            <>
            {project.id == all.project_id ? <span className='text-green-600 flex justify-center items-center w-fit'><TaskOutlinedIcon className='mr-1 text-green-600'/>Already Applied</span> : ''}
            </>
        )
    })}
    <p className='font-inter opacity-50 text-[#0A142F] text-[13px] py-3'>Fixed-price - Expert - Est. Budget: ${project.budget} - {timeAgo}</p>
    {/* <p className='font-inter text-opacity-50 text-[#0A142F] text-[14px] py-3'>
                Job Description: {displayWords.join(' ')} 
                {words.length > 50 && (
                    <span 
                        className="font-cardo text-[#031136] text-[18px] font-semibold cursor-pointer pl-2" 
                        onClick={(event) => handleClick(event, index)}
                    >
                        {expandedProjects[index] ? 'Less' : 'More'}
                    </span>
                )}
            </p> */}
            <p className='font-inter text-opacity-50 text-[#0A142F] text-[14px] py-3'>{project.description}</p>
    {/* <p className='font-inter text-opacity-50 text-[#0A142F] text-[14px] py-3'>Job Description: {project.description} <span className="font-cardo text-[#031136] text-[18px] font-semibold cursor-pointer" onClick={handleClick}>More</span></p> */}
    {JSON.parse(project.skills_required.replace(/'/g,'"')).map((skill,index)=>(
    <Link to=''>
            <span className='border px-4 py-1 border-gray-300 opacity-50 rounded font-inter text-[#0A142F] text-[13px] inline-block mr-2 my-2'>
           {skill}
            </span>
        </Link>
         ))}
        <p className='font-inter text-[#0A142F] text-[14px] py-1 mr-1'>Proposals : <span className='opacity-50'>Less than 5</span></p>
        <img src={verify} alt="" className='inline-block h-3 w-3 mr-1'/>
        <p className='font-inter text-[#0A142F] text-[14px] opacity-50 inline-block'>Payment verified</p>
        <div className="text-[16px] text-[#FFC107] inline-block mx-3">★★★★★</div>
        {/* <p className='font-inter text-[#0A142F] text-[14px] opacity-80 inline-block mr-1'>$0</p> */}
        {/* <p className='font-inter text-[#0A142F] text-[14px] opacity-50 inline-block mr-3'>Spent</p> */}
        <img src={location} alt="" className='inline-block h-3 w-3 mr-1'/>
        <p className='font-inter text-[#0A142F] text-[14px] opacity-50 inline-block'>{ project.project_owner_location ? project.project_owner_location : "NA"}</p>
    </div>
    </Link>
    {/* <ViewProjectPopup isOpen={isDialogOpen} onClose={closeDialog} projectData={{pro_id:project.id, pro_tit:project.title, pro_cat:project.category, pro_desc:project.description, pro_budget:project.budget ,pro_skills:project.skills_required}}/> */}
    {/* <ViewProjectPopup isOpen={isDialogOpen} onClose={closeDialog} projectData={selectedProject}/> */}
    </>
    )
})}
{/* <ViewProjectPopup isOpen={isDialogOpen} onClose={closeDialog} project={selectedProject}/> */}
</div> : <div>
{[...Array(8)].map((_) => {
      return (
    <div className='mb-5'>
    <Skeleton height={30} width={200} style={{ marginLeft: 20, marginTop: 20 }}/>
    <Skeleton height={30} width={300} style={{ marginLeft: 20, marginTop:10 }}/>
    <Skeleton height={110} width={700} style={{ marginLeft: 20, marginTop: 10}}/>
    <Skeleton height={30} width={100} inline={true} style={{marginTop:5, marginLeft:70, float:'left'}}/>
    <Skeleton height={30} width={100} inline={true} count={2} style={{ marginTop:5, marginLeft:5, float:'left'}}/><br/><br/>
    <Skeleton height={20} width={200} style={{ marginLeft: 20}}/>
    <Skeleton height={20} width={250} style={{ marginLeft: 20, marginTop:10 }}/>
    </div>
    );})}
    </div>}
{/* <div className='h-8 w-full bg-red-500 mt-6'> pagination </div> */}
    {/* <div className='px-4 md:px-8 py-5 border-t border-b border-gray-200 border-opacity-30'>
    <div className="flex items-center justify-between">
    <p className="font-inter text-[#0A142F] text-[18px] font-semibold">UI Designer - Landing Page</p>
    <div className="flex items-center space-x-2">
        <div className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200">
            <img src={thumbdown} alt="" />
        </div>
        <div className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200">
            <img src={heart} alt="" />
        </div>
    </div>
    </div>
    <p className='font-inter opacity-50 text-[#0A142F] text-[13px] py-3'>Fixed-price - Expert - Est. Budget: $10 - Posted in 12 hours</p>
    <p className='font-inter text-opacity-50 text-[#0A142F] text-[14px] py-3'>Job Description: Graphic Designer for Vogue Tourism in Ajmer Only for Ajmer ( Rajasthan ) OFFLINE Please Share Your Details On this Whatsapp No.+91 95094 98242  Are you a talented and imaginative Graphic Designer with a flair for creating visually stunning and engaging designs? Vogue Tourism, a premier name in the travel and hospitality sector, is <span className="font-cardo text-[#031136] text-[18px] font-semibold cursor-pointer">More</span></p>
    <Link to=''>
            <span className='border px-4 py-1 border-gray-300 opacity-50 rounded font-inter text-[#0A142F] text-[13px] inline-block mr-2 my-2'>
            Social Media Imagery
            </span>
        </Link>
        <p className='font-inter text-[#0A142F] text-[14px] py-1 mr-1'>Proposals : <span className='opacity-50'>Less than 5</span></p>
        <img src={verify} alt="" className='inline-block h-3 w-3 mr-1'/>
        <p className='font-inter text-[#0A142F] text-[14px] opacity-50 inline-block'>Payment verified</p>
        <div className="text-[16px] text-[#FFC107] inline-block mx-3">★★★★★</div>
        <p className='font-inter text-[#0A142F] text-[14px] opacity-80 inline-block mr-1'>$0</p>
        <p className='font-inter text-[#0A142F] text-[14px] opacity-50 inline-block mr-3'>Spent</p>
        <img src={location} alt="" className='inline-block h-3 w-3 mr-1'/>
        <p className='font-inter text-[#0A142F] text-[14px] opacity-50 inline-block'>India</p>
    </div> */}
    <div>
  <div className="flex justify-end items-center gap-6 mt-7
   mr-5">
  <IconButton
    size="sm"
    variant="outlined"
    onClick={prev}
    disabled={active === 1}
    style={{ backgroundImage: 'linear-gradient(45deg, #00BF58, #E3FF75)', border: 'none' }}
  >
    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-white" />
  </IconButton>

  
  {[...Array(5)].map((_, index) => {
    const pageNumber = index + 1;
    return (
      <span
        key={pageNumber}
        className={`px-0 py-1 ${active === pageNumber ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#00BF58] to-[#E3FF75] font-bold font-inter text-[14px] cursor-pointer' : 'text-[#0A142F] font-bold font-inter text-[14px] cursor-pointer'}`}
        onClick={() => setActive(pageNumber)}
      >
        {pageNumber}
      </span>
    );
  })}

  <IconButton
    size="sm"
    variant="outlined"
    onClick={next}
    disabled={active === 5}
    style={{ backgroundImage: 'linear-gradient(45deg, #00BF58, #E3FF75)', border: 'none' }}
  >
    <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-white" />
  </IconButton>
</div>
  </div>
</div>  
{/* <div class="w-full md:w-[70%] pt-3 bg-[#FFFFFF] py-8 border border-gray-200 border-opacity-30 text-left">
<div className='px-4 md:px-8 pt-4 border-b border-gray-200 border-opacity-30'>
    
    <div className="flex justify-between items-center">
    <div className="flex items-center">
    <h1  className="font-cardo text-[21px] text-[#031136] font-normal mr-1">Jobs You Might Like</h1>
    </div>
    <div className="flex items-center">
    <div className='flex items-center mr-1 space-x-1 border p-1 w-[200px] rounded-md'>
        <img src={search} alt="Search Icon" className="h-4 w-4 mr-1 ml-1" />
        <input className='w-28 lg:w-40 xl:w-[160px] h-7 text-sm lg:text-sm outline-none' placeholder='Search Jobs' value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
    </div>
</div>
    <p 
        className={`font-inter opacity-50 text-[#0A142F] text-[13px] py-2 inline-block pr-10 relative cursor-pointer`} 
        onClick={() => setSelected('Best Matches')}
    >
        Best Matches
        {selected === 'Best Matches' && <span style={underlineStyle}></span>}
    </p>

    <p 
        className={`font-inter opacity-50 text-[#0A142F] text-[13px] py-2 inline-block pr-10 relative cursor-pointer`} 
        onClick={() => setSelected('Most Recent')}
    >
        Most Recent
        {selected === 'Most Recent' && <span style={underlineStyle}></span>}
    </p>
    <p 
        className={`font-inter opacity-50 text-[#0A142F] text-[13px] py-2 inline-block relative cursor-pointer`} 
        onClick={() => setSelected('Saved Jobs')}
    >
        Saved Jobs
        {selected === 'Saved Jobs' && <span style={underlineStyle}></span>}
    </p>
    </div>
    <div className='px-4 md:px-8 py-4'>
      <p className='font-inter opacity-50 text-[#0A142F] text-[13px]'>Browse jobs that match your experience to a client's hiring preferences. Ordered by most relevant.</p>
    </div>
    {[...Array(8)].map((_) => {
      return (
    <div>
    <Skeleton height={30} width={200} style={{ marginLeft: 20, marginTop: 20 }}/>
    <Skeleton height={30} width={300} style={{ marginLeft: 20, marginTop:10 }}/>
    <Skeleton height={110} width={700} style={{ marginLeft: 20, marginTop: 10}}/>
    <Skeleton height={30} width={100} inline={true} style={{marginTop:5, marginLeft:70, float:'left'}}/>
    <Skeleton height={30} width={100} inline={true} count={2} style={{ marginTop:5, marginLeft:5, float:'left'}}/><br/><br/>
    <Skeleton height={20} width={200} style={{ marginLeft: 20}}/>
    <Skeleton height={20} width={250} style={{ marginLeft: 20, marginTop:10 }}/>
    </div>
    );})}
</div>} */}
</div>
</div>
    <HomeSection4/>
    <Footer/>
    </>
  )
}

export default FreelancerAfterLogin