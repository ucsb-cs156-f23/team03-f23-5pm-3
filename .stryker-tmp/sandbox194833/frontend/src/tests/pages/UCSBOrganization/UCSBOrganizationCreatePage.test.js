import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import UCSBOrganizationCreatePage from "main/pages/UCSBOrganization/UCSBOrganizationCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("UCSBOrganizationCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", () => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBOrganizationCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const ucsbOrganization = {
            orgcode: "ZPR",
            orgTranslationShort: "ZETA PHI RHO",
            orgTranslation: "ZETA PHI RHO",
            inactive: false
        };

        axiosMock.onPost("/api/ucsborganization/post").reply( 202, ucsbOrganization );

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBOrganizationCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("UCSBOrganizationForm-orgcode")).toBeInTheDocument();
        });

        const orgcodeField = screen.getByTestId("UCSBOrganizationForm-orgcode");
        const orgTranslationShortField = screen.getByTestId("UCSBOrganizationForm-orgTranslationShort");
        const orgTranslationField = screen.getByTestId("UCSBOrganizationForm-orgTranslation");
        const inactiveField = screen.getByTestId("UCSBOrganizationForm-inactive");
        const submitButton = screen.getByTestId("UCSBOrganizationForm-submit");

        fireEvent.change(orgcodeField, { target: { value: 'ZPR' } });
        fireEvent.change(orgTranslationShortField, { target: { value: 'ZETA PHI RHO' } });
        fireEvent.change(orgTranslationField, { target: { value: 'ZETA PHI RHO' } });
        fireEvent.change(inactiveField, { target: { value: false } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
                "orgcode": "ZPR",
                "orgTranslationShort": "ZETA PHI RHO",
                "orgTranslation": "ZETA PHI RHO",
                "inactive": "false"
        });

        expect(mockToast).toBeCalledWith("New ucsbOrganization Created - orgcode: ZPR");
        expect(mockNavigate).toBeCalledWith({ "to": "/ucsborganization" });
    });

});


