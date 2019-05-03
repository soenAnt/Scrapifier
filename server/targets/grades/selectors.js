const authPage = {
  pageUrl: 'https://my.concordia.ca/psp/upprpr9/?cmd=login&languageCd=ENG',
  username: '#userid',
  password: '#pwd',
  submitButton: '#login > table > tbody > tr:nth-child(4) > td:nth-child(2) > input',
};

const frontPage = {
  myGradesHref: 'https://my.concordia.ca/psp/upprpr9/EMPLOYEE/EMPL/s/WEBLIB_CONCORD.CU_SIS_INFO.FieldFormula.IScript_Campus_Student_Trans?PORTALPARAM_PTCNAV=CAMPUS_STUDENT_TRANSCRIPT&EOPP.SCNode=EMPL&EOPP.SCPortal=EMPLOYEE&EOPP.SCName=CU_MY_STUD_CENTRE&EOPP.SCLabel=My%20Student%20Centre&EOPP.SCPTfname=CU_MY_STUD_CENTRE&FolderPath=PORTAL_ROOT_OBJECT.CU_MY_STUD_CENTRE.CAMPUS_STUDENT_TRANSCRIPT&IsFolder=false',
};

const gradesTermSelectionPage = {
  radioSelectTermIdNames: {
    winter2018: 'SSR_DUMMY_RECV1$sels$5$$0',
    winter2019: 'SSR_DUMMY_RECV1$sels$2$$0',
  },
  buttonContinueIdName: 'DERIVED_SSS_SCT_SSR_PB_GO',
};

const gradesTableViewPage = {
  gradeTableId: '#win0divDERIVED_SSS_GRD_GROUPBOX2',
};

module.exports = {
  authPage, frontPage, gradesTermSelectionPage, gradesTableViewPage,
};
