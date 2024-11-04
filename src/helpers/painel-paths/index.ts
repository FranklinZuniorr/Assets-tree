export const PAINEL_PATHS = {
    companies: {
        name: 'Companies',
        path: '/'
    },
    companyInfo: {
        name: 'Company Info',
        path: '/company-info/:companyName/:id',
        fnPath: (id: string, companyName: string) => `/company-info/${companyName}/${id}`
    }
}