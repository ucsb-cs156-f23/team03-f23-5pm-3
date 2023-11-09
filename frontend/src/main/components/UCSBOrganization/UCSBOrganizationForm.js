import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function UCSBOrganizationForm({  submitAction, buttonLabel = "Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: {}, }
    );
    // Stryker restore all

    const navigate = useNavigate();

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks

    // Stryker disable next-line Regex
    //const inactive_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;

    // Stryker disable next-line all
    const inactive_regex = /(true|false)/i; // true or false.

    return (

        <Form onSubmit={handleSubmit(submitAction)}>


            <Row>

                
                <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="orgCode">OrgCode</Form.Label>
                            <Form.Control
                                data-testid="UCSBOrganizationForm-orgCode"
                                id="orgCode"
                                type="text"
                                isInvalid={Boolean(errors.orgCode)}
                                {...register("orgCode", {
                                    required: "OrgCode is required."
                                })}
                            
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.orgCode?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                <Col>



                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="orgTranslationShort">OrgTranslationShort</Form.Label>
                        <Form.Control
                            data-testid="UCSBOrganizationForm-orgTranslationShort"
                            id="orgTranslationShort"
                            type="text"
                            isInvalid={Boolean(errors.orgTranslationShort)}
                            {...register("orgTranslationShort", {
                                required: "OrgTranslationShort is required."
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.orgTranslationShort?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col>



                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="orgTranslation">OrgTranslation</Form.Label>
                        <Form.Control
                            data-testid="UCSBOrganizationForm-orgTranslation"
                            id="orgTranslation"
                            type="text"
                            isInvalid={Boolean(errors.orgTranslation)}
                            {...register("orgTranslation", {
                                required: "OrgTranslation is required."
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.orgTranslation?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="inactive">Inactive</Form.Label>
                        <Form.Control
                            data-testid="UCSBOrganizationForm-inactive"
                            id="inactive"
                            type="text"
                            isInvalid={Boolean(errors.inactive)}
                            {...register("inactive", { 
                                required: true,
                                pattern: inactive_regex
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.inactive && 'Inactive is required. '}
                            {errors.inactive?.message} {'Inactive must be true or false'}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                
            </Row>

            

            <Row>
                <Col>
                    <Button
                        type="submit"
                        data-testid="UCSBOrganizationForm-submit"
                    >
                        {buttonLabel}
                    </Button>
                    <Button
                        variant="Secondary"
                        onClick={() => navigate(-1)}
                        data-testid="UCSBOrganizationForm-cancel"
                    >
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Form>

    )
}

export default UCSBOrganizationForm;
