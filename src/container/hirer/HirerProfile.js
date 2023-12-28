import React, { useState,useRef, useEffect, useCallback } from 'react'
import Navbar from '../../components/Layout/Navbar'
import freelancercover from '../../components/images/freelancercover.png'
import edit from '../../components/images/edit.png'
// import profilepic from '../../components/images/profilepic.png'
import HomeSection4 from '../../components/Layout/HomeSection4'
import Footer from '../../components/Layout/Footer'
import { Link, useNavigate } from 'react-router-dom'
import verify from '../../components/images/verify.png'
import location from '../../components/images/location.png'
import availablenow from '../../components/images/availablenow.png'
// import jobsuccess from '../../components/images/jobsuccess.png'
// import pin from '../../components/images/pin.png'
// import threedot from '../../components/images/threedot.png'
// import share from '../../components/images/share.png'
// import updownarrow from '../../components/images/updownarrow.png'
import plus from '../../components/images/plus.png'
// import cupbook from '../../components/images/cupbook.png'
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import HirerAccountPopup from '../hirer/HirerAllPopup/AccountPopup'
import HirerCompanyPopup from '../hirer/HirerAllPopup/CompanyPopup'
import HirerContactPopup from './HirerAllPopup/ContactPopup'
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { GetHirerSelfProfileAction } from '../../redux/Hirer/HirerAction'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from "react-toastify";

import axios from 'axios'

const HirerSelfProfile = () => {

  // const accessToken = useSelector(state => state.login.accessToken);
  const accessToken = useSelector(state => state.login.accessToken) || localStorage.getItem('jwtToken');
  console.log("hirer self profile access token", accessToken)  
  const hirerselfprofile = useSelector(state => state.hirerImage.hirerimageprofile)
  var hirerData = useState(null)
  if(hirerselfprofile != null){
    hirerData = hirerselfprofile
  console.log("hirer profile data : ",hirerData)
}
  const dispatch = useDispatch();

  const formatToDDMMYYYY = (dateStr) => {
        if(!dateStr) return '';
        const [year, month, day] = dateStr.split("-");
        return `${day}-${month}-${year}`;
    }
  const [isHovered, setIsHovered] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [freelancerproject, setfreelancerproject] = useState([]);
//   const id = freelancerselfprofile && freelancerselfprofile[0].id ? freelancerselfprofile[0].id : '';



  React.useEffect(() => {
    dispatch(GetHirerSelfProfileAction(accessToken))
  }, [accessToken])

  function handleMouseEnter() {
    setIsHovered(true);
}

function handleMouseLeave() {
    setIsHovered(false);
}

function combinedClick() {
    handlePinClick();
    handleMouseLeave();
}

  
  const [isAvailable, setIsAvailable] = useState(localStorage.getItem('userAvailability') || 'available');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('userAvailability', isAvailable);
  }, [isAvailable]);





  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccount, setIsAccountOpen] = useState(false);
  const [isDetails, setIsDetailsOpen] = useState(false);
  const [isContacts, setIsContactsOpen] = useState(false);
  
  const [isAvailableOffOpen, setIsAvailableOffOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null)


  const openAvailableOff = () => {
    setIsAvailableOffOpen(true);
  };

  const closeAvailableOff = () => {
    setIsAvailableOffOpen(false);
  };


    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleEditAccount = () => {
        setIsAccountOpen(true)
    }

    const handleAccountClose = () => {
        setIsAccountOpen(false);
    }

    const handleEditDetails = () => {
        setIsDetailsOpen(true)
    }

    const handleDetailsClose = () => {
        setIsDetailsOpen(false);
    }

    const handleEditContacts = () => {
        setIsContactsOpen(true)
    }

    const handleContactsClose = () => {
        setIsContactsOpen(false);
    }
  
      const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };

      const handleImageClick =()=>{
        inputRef.current.click();
      }
      
      const [hirerUpdate, sethirerUpdate] = React.useState(hirerData)

      const onChange = e => {
        sethirerUpdate({
          ...hirerUpdate,
          [e.target.name]: e.target.value
        });
      };
console.log("______________",hirerUpdate)
const [first_Name, setfirst_Name] = useState("")
console.log("++++++++++++++",first_Name)
      const handleImageSave = async () => {
    const formData = new FormData();
    formData.append("images_logo", selectedFile);
    console.log("selected file in hirer :", selectedFile )
    
    axios.put('https://www.api.alanced.com/account/hirer/profile/update',formData,{
        headers: {
            "Authorization":`Bearer ${accessToken}`
          },first_Name: first_Name
    })
    .then(response => {
        if (response.data.status === 200) {
            setReviews(response.data.data);
            dispatch(GetHirerSelfProfileAction(accessToken))
            toast.success('profile image updated',{className: 'mt-[100px]'})
        } else {
            console.log(response.data.message || 'Error fetching reviews');
        }
    })
    .catch(err => {
        console.log(err.message);
    });
    setIsModalOpen(false);
    // navigate('/hirer/profile-edit');
}

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

    React.useEffect(() => {
        // dispatch(GetFreelancerSelfProfileAction(accessToken))
      }, [])


      const [showCopyMessage, setShowCopyMessage] = useState(false);
      const profileLink = "https://www.api.alanced.com/freelancer/edit-profile"; 
  
      const handlePinClick = useCallback(() => {
        navigator.clipboard.writeText(profileLink)
            .then(() => {
                console.log("Setting showCopyMessage to true"); 
                setShowCopyMessage(true);
                setTimeout(() => setShowCopyMessage(false), 2000);
            })
            .catch(err => {
                console.error("Could not copy text: ", err);
            });
    }, [profileLink]);
    
  
     
  return (
   <>
   <Navbar/>
   <div className='mt-4 mx-[9%]'>
   <img src={freelancercover} alt="" className='h-[272px] w-full mb-4'/>
   <div class="flex flex-col md:flex-row">
   <div className="md:w-[30%] bg-white border border-gray-200 border-opacity-30">
   <div className='border-b border-gray-200 border-opacity-30 py-8 p-4 mb-4 md:mb-0 relative'>
   <div className="relative w-28 h-28 mx-auto">
    {hirerselfprofile != null ? 
                    <img  alt="Profile" src={hirerData && hirerData ? "https://www.api.alanced.com"+hirerData.images_logo : ''} className="rounded-full w-full h-full border border-gray-200" /> : 
                    <div className='h-full w-full border border-gray-200 rounded-full'><Skeleton className='z-0' height={104} width={104} style={{borderRadius: 100}}/></div>}
                    <div className="absolute top-1 left-2 p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer" onClick={handleEditClick}>
                        <img src={edit} alt="edit" />
                    </div>
                    <div class="absolute bottom-3 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
   </div>
   <div className='border-b border-gray-200 border-opacity-30 text-left flex flex-col justify-center items-center py-4 px-4 md:px-8'>
        <h1 className="font-cardo text-[21px] text-[#031136] font-normal mr-1">Verifications</h1>
    <p className='font-inter text-[#0A142F] text-[14px] py-1 inline-block mr-1'>ID : <span className='opacity-50 mr-1'>Verified</span><img src={verify} alt="" className='inline-block h-3 w-3 mb-0.5'/></p>
    
   </div>
   </div>
   {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto mt-10">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-white rounded-lg w-[90%] md:w-[50%] p-6 relative z-20">
                            <div className="text-right">
                                <button onClick={handleModalClose} className="text-gray-500 hover:text-gray-700">
                                <i class="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div className='mx-8'>
                            <h1 className="font-cardo text-[21px] text-[#031136] font-normal text-left">Edit Photo</h1>
                            <p className="font-cardo text-[17px] text-[#031136] font-normal pt-2 text-left">Show Clients The Best Version Of Yourself!</p>
                            <div className="flex justify-between items-center mt-4 mb-2">
                            <div className="relative w-[200px] h-[200px] overflow-hidden">
                            {selectedFile ? 
                            <img className="absolute inset-0 w-full h-full object-cover" src={URL.createObjectURL(selectedFile)} alt="Profile" /> 
                            : 
                            <img className="absolute inset-0 w-full h-full object-cover" src={hirerData && hirerData ? "https://www.api.alanced.com"+hirerData.images_logo : ''} alt="Profile" />
                            }
                            </div>
                            <div className="relative w-28 h-28 overflow-hidden">
                            {selectedFile ? 
                            <img className="absolute inset-0 w-full h-full object-cover" src={URL.createObjectURL(selectedFile)} alt="Profile" /> 
                            : 
                            <img className="absolute inset-0 w-full h-full object-cover" src={hirerData && hirerData ? "https://www.api.alanced.com"+hirerData.images_logo : ''} alt="Profile" />
                            }
                            </div>
                            <div className="relative w-20 h-20 overflow-hidden">
                            {selectedFile ? 
                            <img className="absolute inset-0 w-full h-full object-cover" src={URL.createObjectURL(selectedFile)} alt="Profile" /> 
                            : 
                            <img className="absolute inset-0 w-full h-full object-cover" src={hirerData && hirerData ? "https://www.api.alanced.com"+hirerData.images_logo : ''} alt="Profile" />
                            }
                            </div>
                            <div className="relative w-16 h-16 overflow-hidden">
                            {selectedFile ? 
                            <img className="absolute inset-0 w-full h-full object-cover" src={URL.createObjectURL(selectedFile)} alt="Profile" /> 
                            : 
                            <img className="absolute inset-0 w-full h-full object-cover" src={hirerData && hirerData ? "https://www.api.alanced.com"+hirerData.images_logo : ''} alt="Profile" />
                            }
                            </div>
                    <input 
                    type='file' 
                    ref={inputRef} 
                    // name='images_logo'
                    style={{display:"none"}}
                    onChange={handleFileChange}
                    accept="image/*"
                />
                        </div>
                        <p className="font-cardo text-[17px] text-[#031136] font-normal pt-2 text-left">Must Be An Actual Photo Of You.</p>
                        <p className='text-[#0A142F] font-inter opacity-50 text-[14px] text-left'>Logos, clip-art, group photos, and digitally-altered images are not allowed.</p>
                            <div className="mt-8 flex justify-end">
                            <Link to=''><span class="inline-block text-sm px-4 py-[10px] bg-gradient-to-r from-[#00BF58] to-[#E3FF75] border rounded border-none text-white mr-3 font-semibold" onClick={handleImageClick} onChange={handleFileChange}>Change Image</span></Link>
                            <div class="p-0.5 inline-block rounded bg-gradient-to-b from-[#00BF58] to-[#E3FF75]" onClick={handleImageSave}>
                                <Link to=''><button class="px-2 py-1 bg-white rounded-sm"><p class="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">Save Photo</p></button></Link>
                            </div>     
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
   <div class="md:w-[70%] border border-gray-200 border-opacity-30">
   {/* <div className='border-b border-gray-200 border-opacity-30 flex flex-col md:flex-row py-3.5'>
   <div class="w-full md:w-3/4 pt-3 text-left pl-8">
            <div className="flex items-center">
                
            </div>
            <div className="flex items-center my-1">
                
            </div>

            <div className="flex space-x-1 mt-2">
            <button className={`flex items-center justify-center text-[#0A142F] font-inter opacity-50 text-[13px] py-2 px-4 focus:outline-none rounded-full ${isAvailable === 'available' ? 'ring-1 ring-gray-400' : ''}`}>
            <img src={availablenow} alt="" className='h-[16px] mr-2' />
                Available Now
            </button>

            <button className={`text-center text-[#0A142F] font-inter opacity-50 text-[13px] py-2 px-4 focus:outline-none rounded-full ${isAvailable === 'off' ? 'ring-1 ring-gray-400' : ''}`}>
                Off
            </button>

                
            </div>
            <div className="flex items-center mt-3">
                
            </div>
        </div>
        
   </div> */}
   
   <div className="flex justify-between items-center">
    <div className="flex items-center">
        
    </div>
    
</div>
   
   <div className='border-b flex border-gray-200 border-opacity-30 text-left py-6 px-4 md:px-8' id='workHistory'>
    <div className='flex flex-col w-fit'>
    <span className='text-xl text-[#00BF58] font-bold'>Account</span>
    {hirerselfprofile != null ? 
    <div className='flex flex-col mt-5 ml-4'>
    <span className='text-2xl font-semibold'>{hirerData.first_Name + ' ' + hirerData.last_Name}</span>
    <span className='text-md text-gray-500 mt-4'>Client</span>
    <span className='text-lg font-semibold'>{hirerData.first_Name + ' ' + hirerData.last_Name}</span>
    <span className='text-md text-gray-500 mt-4'>Email</span>
    <span className='font-semibold'>{hirerData.email}</span>
    </div> :
    <div className='flex flex-col mt-5 ml-4'>
    <span className='text-2xl font-semibold'><Skeleton height={30} width={200}/></span>
    <span className='text-md text-gray-500 mt-4'>Client</span>
    <span className='text-lg font-semibold'><Skeleton height={20} width={200}/></span>
    <span className='text-md text-gray-500 mt-4'>Email</span>
    <span className='font-semibold'><Skeleton height={20} width={300}/></span>
    </div>
    }
    </div>
    
    <div class="p-1 w-10 h-10 flex justify-center items-center float-right ml-auto bg-white rounded-full border border-gray-200 mt-1 cursor-pointer" onClick={handleEditAccount}>
                    <img src={edit} alt="edit" />
                </div>
    
   </div>
   
            {isAccount && <HirerAccountPopup isAvailable={isAvailable} setIsAvailable={setIsAvailable} handleAccountClose={handleAccountClose}/>}
   <div className='border-b flex border-gray-200 border-opacity-30 text-left py-6 px-4 md:px-8' id='workHistory'>
    <div className='flex flex-col'>
    <span className='text-xl text-[#00BF58] font-bold'>Company Details</span>
    {hirerselfprofile != null ? 
    <div className='flex flex-col mt-5 ml-4'>
    <span className='text-lg font-semibold'>{hirerData.first_Name + ' ' + hirerData.last_Name}</span>
    <span className='text-md text-gray-500 mt-4'>Website</span>
    <span className='font-semibold'>{hirerData.social_media}</span>
    <span className='text-md text-gray-500 mt-4'>Establish</span>
    <span className='font-semibold'>{formatToDDMMYYYY(hirerData.Company_Establish)}</span>
    </div> : 
    <div className='flex flex-col mt-5 ml-4'>
    <span className='text-lg font-semibold'><Skeleton height={20} width={200}/></span>
    <span className='text-md text-gray-500 mt-4'>Website</span>
    <span className='font-semibold'><Skeleton height={20} width={300}/></span>
    <span className='text-md text-gray-500 mt-4'>Establish</span>
    <span className='font-semibold'><Skeleton height={20} width={100}/></span>
    </div>}
    </div>
    <div class="p-1 w-10 h-10 flex justify-center items-center float-right ml-auto bg-white rounded-full border border-gray-200 mt-1 cursor-pointer" onClick={handleEditDetails}>
                    <img src={edit} alt="edit" />
                </div>
   <div className="flex items-center justify-between">
    
    </div>
    
   
   </div>
   
            { isDetails && <HirerCompanyPopup handleDetailsClose={handleDetailsClose}/>}
   <div className='border-b flex border-gray-200 border-opacity-30 text-left py-6 px-4 md:px-8' id='workHistory'>
    <div className='flex flex-col'>
    <span className='text-xl text-[#00BF58] font-bold'>Company Contacts</span>
    {hirerselfprofile != null ? 
    <div className='flex flex-col mt-5 ml-4'>
    <span className='text-md text-gray-500'>Owner</span>
    <span className='text-lg font-semibold'>{hirerData.first_Name + ' ' + hirerData.last_Name}</span>
    <span className='text-md text-gray-500 mt-4'>phone</span>
    <span className='text-lg font-semibold'>{hirerData.contact}</span>
    <span className='text-md text-gray-500 mt-4'>Address</span>
    <span className='text-lg font-semibold'>{hirerData.Address}</span>
    </div> :

<div className='flex flex-col mt-5 ml-4'>
<span className='text-md text-gray-500'>Owner</span>
<span className='text-lg font-semibold'><Skeleton height={20} width={200}/></span>
<span className='text-md text-gray-500 mt-4'>phone</span>
<span className='text-lg font-semibold'><Skeleton height={20} width={250}/></span>
<span className='text-md text-gray-500 mt-4'>Address</span>
<span className='text-lg font-semibold'><Skeleton height={20} width={300}/></span>
</div>}
    </div>
    <div class="p-1 w-10 h-10 flex justify-center items-center float-right ml-auto bg-white rounded-full border border-gray-200 mt-1 cursor-pointer" onClick={handleEditContacts}>
                    <img src={edit} alt="edit" />
                </div>
   </div>
   
            
            {isContacts && <HirerContactPopup handleContactsClose={handleContactsClose}/>}
   </div>
   </div>
    
    </div>
   <HomeSection4/>
   <Footer/>
   </>
  )
}

export default HirerSelfProfile