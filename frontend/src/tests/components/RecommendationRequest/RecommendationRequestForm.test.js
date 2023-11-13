import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { recommendationRequestFixtures } from "fixtures/recommendationRequestFixtures";

import { QueryClient, QueryClientProvider } from "react-query";
import RecommendationRequestForm from "main/components/RecommendationRequest/RecommendationRequestForm";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("RecommendationRequest tests", () => {
    const queryClient = new QueryClient();

    const expectedHeaders = ["Requester email", "Professor email", "Explanation", "Date requested (iso format)", "Date needed (iso format)", "Done"];
    const testId = "RecommendationRequestForm";

    test("renders correctly with no initialContents", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <RecommendationRequestForm />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();

        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });

    });

    test("renders correctly when passing in initialContents", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <RecommendationRequestForm initialContents={recommendationRequestFixtures.oneRecommendation} />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();

        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });
    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <RecommendationRequestForm />
                </Router>
            </QueryClientProvider>
        );
        expect(await screen.findByTestId(`${testId}-cancel`)).toBeInTheDocument();
        const cancelButton = screen.getByTestId(`${testId}-cancel`);

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
    });

    test("that field required validations are performed", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <RecommendationRequestForm />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();
        const submitButton = screen.getByText(/Create/);
        fireEvent.click(submitButton);

        await screen.findByText(/Requester email is required./);
        expect(screen.getByText(/Professor email is required./)).toBeInTheDocument();
        expect(screen.getByText(/Explanation is required./)).toBeInTheDocument();
        expect(screen.getByText(/Date requested is required./)).toBeInTheDocument();
        expect(screen.getByText(/Date needed is required./)).toBeInTheDocument();
        expect(screen.getByText(/Done field is required./)).toBeInTheDocument();
    });


    test("correct error messsages on bad input: requesterEmail", async () => {

        render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await screen.findByTestId("RecommendationRequestForm-requesterEmail");
        const requesterEmailField = screen.getByTestId("RecommendationRequestForm-requesterEmail");
        const submitButton = screen.getByTestId("RecommendationRequestForm-submit");

        fireEvent.change(requesterEmailField, { target: { value: 'invalid email' } });
        fireEvent.click(submitButton);

        await screen.findByText(/Requester email is invalid./);
    });

    test("correct error messsages on bad input: professorEmail", async () => {

        render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await screen.findByTestId("RecommendationRequestForm-professorEmail");
        const professorEmailField = screen.getByTestId("RecommendationRequestForm-professorEmail");
        const submitButton = screen.getByTestId("RecommendationRequestForm-submit");

        fireEvent.change(professorEmailField, { target: { value: 'invalid email' } });
        fireEvent.click(submitButton);

        await screen.findByText(/Professor email is invalid./);
    });

    test("correct error messsages on bad input: dateRequested", async () => {

        render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await screen.findByTestId("RecommendationRequestForm-professorEmail");
        const professorEmailField = screen.getByTestId("RecommendationRequestForm-professorEmail");
        const submitButton = screen.getByTestId("RecommendationRequestForm-submit");

        fireEvent.change(professorEmailField, { target: { value: 'invalid email' } });
        fireEvent.click(submitButton);

        await screen.findByText(/Professor email is invalid./);
    });

    test("correct error messsages on bad input: done", async () => {

        render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await screen.findByTestId("RecommendationRequestForm-done");
        const doneField = screen.getByTestId("RecommendationRequestForm-done");
        const submitButton = screen.getByTestId("RecommendationRequestForm-submit");

        fireEvent.change(doneField, { target: { value: 'invalid boolean' } });
        fireEvent.click(submitButton);

        await screen.findByText(/Value must be 'true' or 'false'./);
    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();

        render(
            <Router  >
                <RecommendationRequestForm submitAction={mockSubmitAction} />
            </Router>
        );
        await screen.findByTestId("RecommendationRequestForm-requesterEmail");

        const requesterEmailField = screen.getByTestId("RecommendationRequestForm-requesterEmail");
        const professorEmailField = screen.getByTestId("RecommendationRequestForm-professorEmail");
        const explanation = screen.getByTestId("RecommendationRequestForm-explanation");
        const dateRequested = screen.getByTestId("RecommendationRequestForm-dateRequested");
        const dateNeeded = screen.getByTestId("RecommendationRequestForm-dateNeeded");
        const done = screen.getByTestId("RecommendationRequestForm-done");
        const submitButton = screen.getByTestId("RecommendationRequestForm-submit");

        fireEvent.change(requesterEmailField, { target: { value: 'r@gmail.com' } });
        fireEvent.change(professorEmailField, { target: { value: 'p@ucsb.edu' } });
        fireEvent.change(explanation, { target: { value: 'For grad school.' } });
        fireEvent.change(dateRequested, { target: { value: '2022-01-02T12:00' } });
        fireEvent.change(dateNeeded, { target: { value: '2022-03-02T12:00' } });
        fireEvent.change(done, { target: { value: 'false' } });        
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(screen.queryByText(/Request email is invalid./)).not.toBeInTheDocument();
        expect(screen.queryByText(/Professor email is invalid./)).not.toBeInTheDocument();
    });

});