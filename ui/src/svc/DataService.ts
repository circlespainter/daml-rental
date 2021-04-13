import axios from '../utils/axios'

export interface Template {
    moduleName: string
    entityName: string
}

export interface PropertyData {
    authority: string
    landlord: string
    tenant: string
    registerId: string
}

class DataService {
    // TODO typesafe
    loadContracts = async (template: Template) =>
        await axios().post('/contracts/search', {"%templates" : [
            { "moduleName": `${template.moduleName}`, "entityName": `${template.entityName}` }
        ]}).then(res => res.data.result)

    newProperty = async (prop: PropertyData) =>
        await axios().post('/command/create', {
            templateId: {
                moduleName: 'Rental',
                entityName: 'Property'
            },
            argument: prop
        }).then()

    rentProperty = async (contractId: string) =>
        await axios().post('/command/exercise', {
            templateId: {
                moduleName: 'Rental',
                entityName: 'Property'
            },
            choice: "Property_Rent",
            contractId: contractId,
            argument: {}
        }).then()
}

export default new DataService()