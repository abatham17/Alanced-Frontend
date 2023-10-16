const API = {
  Auth: {
    Login: "/account/login",
  },

  Freelancers: {
    Freelancer: {
      FreelancerRegistration: '/account/freelancer/registration',
      FreelancerSelfProfileView: '/account/freelancer/selfprofile/view',
      FreelancerViewReviews:'/freelance/View-all/Review',
      ViewAllProjects: '/freelance/view-all/Project',
      UpdateFreelancerProfile: '/account/freelancer/profile/update',
      AddBidAmount: '/freelance/Add/bid',
      ViewFreelancerSelfBid: '/freelance/view/freelancer-self/bid',
      ViewFreelancerSelfBidProject: '/freelance/view/freelancer-self/project-bid',
      AddFreelancerEmployment:'/freelance/Add/Freelancer/Employment',
      // SavedUnsavedJobs:'/freelance/saved-projects',
      // ViewAllSavedJobs:'/freelance/View-all/SavedProjects'
    }
  },
  
  Hirers: {
    Hirer: {
      HirerRegistration: '/account/hirer/registration',
      ViewAllFreelancers:'/account/freelancer/profile/view-all',
      ViewHirerSelfProject:'/freelance/view/hirer-self/Project',
      ViewAllBids:'/freelance/View/bids',
      UpdateProject:'/freelance/update/project',
      AddProject:'/freelance/Add/Project'
    }
  }
};


export default API;