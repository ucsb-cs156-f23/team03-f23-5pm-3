import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import UCSBOrganizationForm from "main/components/UCSBOrganization/UCSBOrganizationForm";
import { ucsbOrganizationFixtures } from "fixtures/ucsbOrganizationFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("UCSBOrganizationForm tests", () => {

    test("renders correctly", async () => {

        render(
            <Router  >
                <UCSBOrganizationForm />
            </Router>
        );
        await screen.findByText(/OrgCode/);
        await screen.findByText(/Create/);
    });


    test("renders correctly when passing in a UCSBOrganization", async () => {

        render(
            <Router  >
                <UCSBOrganizationForm initialContents={ucsbOrganizationFixtures.oneOrganization} />
            </Router>
        );
        await screen.findByTestId(/UCSBOrganizationForm-orgCode/);
        const orgCodeField = screen.getByTestId("UCSBOrganizationForm-orgCode");
        fireEvent.change(orgCodeField, { target: { value: 'ZPR' } });
        //expect(screen.getByText(/orgCode/)).toBeInTheDocument();
        expect(screen.getByTestId(/UCSBOrganizationForm-orgCode/)).toHaveValue("ZPR");
        
    });


    test("Correct Error messsages on bad input", async () => {

        render(
            <Router  >
                <UCSBOrganizationForm />
            </Router>
        );
        await screen.findByTestId("UCSBOrganizationForm-inactive");
        const inactiveField = screen.getByTestId("UCSBOrganizationForm-inactive");
        const submitButton = screen.getByTestId("UCSBOrganizationForm-submit");

        fireEvent.change(inactiveField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await screen.findByText(/Inactive must be true or false/);
    });

    test("Correct Error messsages on missing input", async () => {

        render(
            <Router  >
                <UCSBOrganizationForm />
            </Router>
        );
        await screen.findByTestId("UCSBOrganizationForm-submit");
        const submitButton = screen.getByTestId("UCSBOrganizationForm-submit");

        fireEvent.click(submitButton);

        await screen.findByText(/OrgCode is required./);
        expect(screen.getByText(/OrgTranslationShort is required./)).toBeInTheDocument();
        expect(screen.getByText(/OrgTranslation is required./)).toBeInTheDocument();
        expect(screen.getByText(/Inactive is required./)).toBeInTheDocument();
        //expect(screen.getByText(/LocalOrganizationTime is required./)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        render(
            <Router  >
                <UCSBOrganizationForm submitAction={mockSubmitAction} />
            </Router>
        );
        
        await screen.findByTestId("UCSBOrganizationForm-orgCode");
        

        const orgCodeField = screen.getByTestId("UCSBOrganizationForm-orgCode");
        const orgTranslationShortField = screen.getByTestId("UCSBOrganizationForm-orgTranslationShort");
        const orgTranslationField = screen.getByTestId("UCSBOrganizationForm-orgTranslation");
        const inactiveField = screen.getByTestId("UCSBOrganizationForm-inactive");
        const submitButton = screen.getByTestId("UCSBOrganizationForm-submit");
        

        await fireEvent.change(orgCodeField, { target: { value: 'ZPR' } });
        await fireEvent.change(orgTranslationShortField, { target: { value: 'ZETA PHI RHO' } });
        await fireEvent.change(orgTranslationField, { target: { value: 'ZETA PHI RHO' } });
        await fireEvent.change(inactiveField, { target: { value: true } });
        await fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        //expect(screen.queryByText(/Inactive must be true or false/)).not.toBeInTheDocument();
        expect(screen.queryByText(/OrgCode is required./)).not.toBeInTheDocument();
        expect(screen.queryByText(/OrgTranslationShort is required./)).not.toBeInTheDocument();
        expect(screen.queryByText(/OrgTranslation is required./)).not.toBeInTheDocument();
        expect(screen.queryByText(/Inactive is required./)).not.toBeInTheDocument();

    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {

        render(
            <Router  >
                <UCSBOrganizationForm />
            </Router>
        );
        await screen.findByTestId("UCSBOrganizationForm-cancel");
        const cancelButton = screen.getByTestId("UCSBOrganizationForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


