import {BaseMethods} from "../../cypress/common/base";
import {baseSelectors} from "../../cypress/common/selectors";
import {Constants} from "../../cypress/fixtures/constants";
const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        header1: Constants.elementsText.umdFederation.App1.firstHeader,
        header2: Constants.elementsText.umdFederation.App1.secondHeader,
        header3: Constants.elementsText.umdFederation.App1.thirdHeader,
        host: 9001
    },

    {
        host: 9002
    }
]

appsData.forEach((
    property: {
        header1?: string,
        header2?: string,
        header3?: string,
        host: number
    }
) => {
    describe(`Check app1 and app2 starts and running`, () => {
        beforeEach(()=> {
            basePage.openLocalhost(property.host)
        })
        it (`Check App1 elements`, () => {
            basePage.skipTestByCondition(property.host === 9002)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h1,
                text: String(property.header1)
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h1,
                text: String(property.header2)
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h1,
                text: String(property.header3)
            })
        })
        it (`Check App URL`, () => {
            basePage.checkUrlText(`http://localhost:${property.host}/`, true)
        })
    })
})
