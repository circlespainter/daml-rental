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
        await axios().post('/contracts/search', {"templateIds" : [`${template.moduleName}:${template.entityName}`]})
            .then(res => res.data.result)

    newProperty = async (prop: PropertyData) =>
        await axios().post('/command/create', {
            templateId: 'Rental:Property',
            argument: prop
        }).then()

    rentProperty = async (contractId: string) =>
        await axios().post('/command/exercise', {
            templateId: 'Rental:Property',
            choice: "Property_Rent",
            contractId: contractId,
            argument: {}
        }).then()
}

export default new DataService()