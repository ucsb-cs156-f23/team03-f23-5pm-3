import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MenuItemReviewCreatePage from "main/pages/MenuItemReview/MenuItemReviewCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";


//import MenuItemReviewCreatePage from "main/pages/MenuItemReview/MenuItemReviewCreatePage";

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

describe("MenuItemReviewCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MenuItemReviewCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("on submit, makes request to backend, and redirects to /menuitemreview", async () => {

        const queryClient = new QueryClient();
        const menuItemReview = {
            id: 17,
            itemid: 51,
            reviewerEmail: "mattsleep@gmail.com",
            stars: "7",
            dateReviewed: "2022-02-02T00:00",
            comments: "interesting flavor"
        };

        axiosMock.onPost("/api/menuitemreview/post").reply(202, menuItemReview);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MenuItemReviewCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        await waitFor(() => {
            expect(screen.getByTestId("MenuItemReviewForm-itemid")).toBeInTheDocument();
        });

        const itemidField = screen.getByTestId("MenuItemReviewForm-itemid");
        const reviewerEmailField = screen.getByTestId("MenuItemReviewForm-reviewerEmail");
        const starsField = screen.getByTestId("MenuItemReviewForm-stars");
        const dateReviewedField = screen.getByTestId("MenuItemReviewForm-dateReviewed");
        const commentsField = screen.getByTestId("MenuItemReviewForm-comments");
        const submitButton = screen.getByTestId("MenuItemReviewForm-submit"); // 

        fireEvent.change(itemidField, { target: { value: '51' } });
        fireEvent.change(reviewerEmailField, { target: { value: 'mattsleep@gmail.com' } });
        fireEvent.change(starsField, { target: { value: '7' } });
        fireEvent.change(dateReviewedField, { target: { value: '2022-02-02T00:00' } });
        fireEvent.change(commentsField, { target: { value: 'interesting flavor' } });
        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
            "itemid": "51",
            "reviewerEmail": "mattsleep@gmail.com",
            "stars": "7",
            "dateReviewed": "2022-02-02T00:00",
            "comments": "interesting flavor"
        });

        expect(mockToast).toBeCalledWith("New menuItemReview Created - id: 17 itemid: 51"); 
        expect(mockNavigate).toBeCalledWith({ "to": "/menuitemreview" });
    });

});
