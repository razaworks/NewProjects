import { Injectable } from '@angular/core';

@Injectable()
export class Labels {
    readonly formLabels : Object = {

        movementkyc:{

            agentInfo: "Agent Info",
            agentCodeSearch: "Agent Code Search",
            personal: "Personal",
            supervisor:"Supervisor",
            office:"Office",
            mentor:"Mentor",

            movementHistory: "Movement History",
            transaction:"Transaction",
            reason:"Reason",
            effective:"Effective",
            creater:"Creater",
            approver:"Approver",

            portfolio:"Portfolio",
            policyno:"Policy No",
            policyHolder:"Policy Holder",
            riskCommencementDate:"Risk Commencement Date",
            servicingFromDate:"Servicing from Date",
            servicingtoDate:"Servicing To Date",
            businessSource:"Business Source",
            originalWritingAgent:"Original Writing Agent",

            directReportees:"Direct Reportees",
            code:"Code",
            name:"Name",
            designation:"Designation",
            status:"Status",
            from:"From",
            reporteeoffice:"Office",

            monitoringStaff: "Monitoring Staff",
            staffcode:"Code",
            staffName:"Name",
            staffDesignation:"Designation",
            staffStatus:"Status",
            staffFrom:"From",
            staffOffice:"Office",

            protegees:"Prot&#233;g&#233;es",
            proCode:"Code",
            proName:"Name",
            proDesigantion:"Designation",
            proStatus:"Status",
            proFrom: "From",
            proOffice:"Office"
         }
    }
}