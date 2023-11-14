import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import RecommendationForm from "main/components/RecommendationRequest/RecommendationRequestForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function RecommendationRequestCreatePage({storybook=false}) {

  const objectToAxiosParams = (requests) => ({
    url: "/api/recommendationrequest/post",
    method: "POST",
    params: {
      requesterEmail: requests.requesterEmail,
      professorEmail: requests.professorEmail,
      explanation: requests.explanation,
      dateRequested: requests.dateRequested,
      dateNeeded: requests.dateNeeded,
      // Stryker disable next-line all
      done: requests.done === "true"
    }
  });

  const onSuccess = (requests) => {
    toast(`New recommendation request Created - id: ${requests.id}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/recommendationrequest/all"]
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess && !storybook) {
    return <Navigate to="/recommendationrequest" />
  }
  
  return (
    <BasicLayout>
      <div className="pt-2">
          <h1>Create New Recommendation Request</h1>
          <RecommendationForm submitAction={onSubmit} />
      </div>
    </BasicLayout>
  )
}