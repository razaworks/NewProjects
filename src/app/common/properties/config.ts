export const configuration = {
  partialURLs: {
    draftSave: '/moduleName/draftSave/',
    fetchDraftSave: '/moduleName/getdraftdetails/'
  },

  personPanValidation: true,
  postLoginHomeRoute: 'dashboard',
  

  callType: {
    GET: 'get',
    POST: 'post'
  },

  messageType: {
    ERROR: 'ERR',
    SUCCESS: 'SUC',
    INFO: 'INF'
  },

  maxAssessmentScore: 30,

  allowedFileTypes: ['xls', 'xlsx', 'doc', 'docx', 'png', 'jpg', 'jpeg', 'tif', 'pdf'],

  allowedFileSize: '1000000', //1 MB limit

  prodConfigStatus: {
    draftSave: {
      label: "Draft Save",
      val: "1"
    },
    sendForApproval: {
      label: "Sent for Approval",
      val: "2"
    },
    approved: {
      label: "Approved",
      val: "3"
    },
    active: {
      label: "Active",
      val: "3"
    },
    rejected: {
      label: "Rejected",
      val: "4"
    },
    published: {
      label: "Published",
      val: "5"
    },
    expired: {
      label: "Expired",
      val: "6"
    },
    inactive: {
      label: "Inactive",
      val: "7"
    }
  },
 
};
