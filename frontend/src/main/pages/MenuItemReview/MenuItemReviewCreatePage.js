import MenuItemReviewForm from "main/components/MenuItemReview/MenuItemReviewForm";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function MenuItemReviewCreatePage({storybook=false}) {

  // private long id;

  // private long itemid;
  // private String reviewerEmail;
  // private int stars;
  // private LocalDateTime dateReviewed;
  // private String comments;

  const objectToAxiosParams = (menuItemReview) => ({
    url: "/api/menuitemreview/post",
    method: "POST",
    params: {
      itemid: menuItemReview.itemid,
      reviewerEmail: menuItemReview.reviewerEmail,
      stars: menuItemReview.stars,
      dateReviewed: menuItemReview.dateReviewed,
      comments: menuItemReview.comments,
    
    }
  });

  const onSuccess = (menuItemReview) => {
    toast(`New menuItemReview Created - id: ${menuItemReview.id} itemid: ${menuItemReview.itemid}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/menuitemreview/all"]
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess && !storybook) {
    return <Navigate to="/menuitemreview" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New menuItemReview</h1>

        <MenuItemReviewForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}