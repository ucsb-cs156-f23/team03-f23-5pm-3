import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import MenuItemReviewEditPage from "main/pages/MenuItemReview/MenuItemReviewEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import mockConsole from "jest-mock-console";

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
        useParams: () => ({
            id: 100
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("MenuItemReviewEditPage tests", () => {

    describe("when the backend doesn't return data", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/menuitemreview", { params: { id: 100 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <MenuItemReviewEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await screen.findByText("Edit MenuItemReview");
            expect(screen.queryByTestId("MenuItemReviewForm-itemid")).not.toBeInTheDocument();
            restoreConsole();
        });
    });
    // private long id;

    // private long itemid;
    // private String reviewerEmail;
    // private int stars;
    // private LocalDateTime dateReviewed;
    // private String comments;

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/menuitemreview", { params: { id: 100 } }).reply(200, {
                id: 100,
                itemid: '80',
                reviewerEmail: "maxdylan@gmail.com",
                stars: "5",
                dateReviewed: "2022-03-14T15:00",
                comments: "first comment"
            });
            axiosMock.onPut('/api/menuitemreview').reply(200, {
                id: 100,
                itemid: '81',
                reviewerEmail: "maxxdylan@gmail.com",
                stars: "5",
                dateReviewed: "2022-03-14T15:00",
                comments: "second comment"
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <MenuItemReviewEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <MenuItemReviewEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("MenuItemReviewForm-itemid");

            const idField = screen.getByTestId("MenuItemReviewForm-id");
            const itemidField = screen.getByTestId("MenuItemReviewForm-itemid");
            const reviewerEmailField = screen.getByTestId("MenuItemReviewForm-reviewerEmail");
            const starsField = screen.getByTestId("MenuItemReviewForm-stars");
            const dateReviewedField = screen.getByTestId("MenuItemReviewForm-dateReviewed");
            const commentsField = screen.getByTestId("MenuItemReviewForm-comments");
            const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

            expect(idField).toHaveValue("100");
            expect(itemidField).toHaveValue("80");
            expect(reviewerEmailField).toHaveValue("maxdylan@gmail.com");
            expect(starsField).toHaveValue("5");
            expect(dateReviewedField).toHaveValue("2022-03-14T15:00");
            expect(commentsField).toHaveValue("first comment");
            expect(submitButton).toBeInTheDocument();
        });

        test("Changes when you click Update", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <MenuItemReviewEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("MenuItemReviewForm-id");

            const idField = screen.getByTestId("MenuItemReviewForm-id");
            const itemidField = screen.getByTestId("MenuItemReviewForm-itemid");
            const reviewerEmailField = screen.getByTestId("MenuItemReviewForm-reviewerEmail");
            const starsField = screen.getByTestId("MenuItemReviewForm-stars");
            const dateReviewedField = screen.getByTestId("MenuItemReviewForm-dateReviewed");
            const commentsField = screen.getByTestId("MenuItemReviewForm-comments");
            const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

            expect(idField).toHaveValue("100");
            expect(itemidField).toHaveValue("80");
            expect(reviewerEmailField).toHaveValue("maxdylan@gmail.com");
            expect(starsField).toHaveValue("5");
            expect(dateReviewedField).toHaveValue("2022-03-14T15:00");
            expect(commentsField).toHaveValue("first comment");

            expect(submitButton).toBeInTheDocument();

            fireEvent.change(itemidField, { target: { value: '81' } })
            fireEvent.change(reviewerEmailField, { target: { value: 'maxxdylan@gmail.com' } })
            fireEvent.change(starsField, { target: { value: '5' } })
            fireEvent.change(dateReviewedField, { target: { value: '2022-03-14T15:00' } })
            fireEvent.change(commentsField, { target: { value: 'second comment' } })
           

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled());
            expect(mockToast).toBeCalledWith("MenuItemReview Updated - id: 100 itemid: 81");
            expect(mockNavigate).toBeCalledWith({ "to": "/menuitemreview" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 100 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                id: 100,
                itemid: '81',
                reviewerEmail: "maxxdylan@gmail.com",
                stars: "5",
                dateReviewed: "2022-03-14T15:00",
                comments: "second comment"
            })); // posted object

        });

       
    });
});


