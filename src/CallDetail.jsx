import { useParams, useHistory } from "react-router-dom";
import { getAllCallDetails, updateCall } from "./Utils/Api";
import { useEffect, useState } from "react";
import { convertSecondsToHHMMSS } from "./Utils/Utils";

const CallDetail = () => {

    const { id } = useParams(); // Get the call id from the URL
    const history = useHistory();
    const [callDetail, setCallDetail] = useState(null);


    useEffect(() => {




        const fetchCallDetail = async () => {
            const callData = await getAllCallDetails(id);

            setCallDetail(callData);
        };

        fetchCallDetail();
    }, [id]);

    const handleBackClick = () => {
        history.goBack();
    };

    const handleArchiveClick = async () => {

        try {
            
            const updatedArchivedStatus = !callDetail.is_archived;
            const response = await updateCall(id, updatedArchivedStatus);
            console.log("update ",response);
           
            if (response.status===200) {

               
                
                setCallDetail(prevDetail => ({
                    ...prevDetail,
                    is_archived: updatedArchivedStatus
                }));
            }
        } catch (error) {
            console.error('Failed to update call', error);
        }


    };
    if (!callDetail) {
        return <div style={{ alignSelf: 'center' }}>Loading...</div>;
    }

    return (
        <div style={{ flex: 1 }}>
            <button onClick={handleBackClick} className="backbutton">
                Back
            </button>
            <div
                style={{
                    flex: 1,
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "#f9f9f9", // Light background
                    borderRadius: "10px", // Rounded corners
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
                    padding: "20px", // Space inside the box
                    margin: "20px", // Space outside the box
                    width: "300px", // Width of the detail box
                }}
            >
                <h1
                    style={{
                        fontSize: "24px", // Size of the heading
                        color: "#333", // Heading color
                        marginBottom: "15px", // Space below the heading
                    }}
                >
                    Call Detail
                </h1>
                <p
                    style={{
                        fontSize: "18px", // Font size of text
                        color: "#555", // Text color
                        margin: "5px 0", // Space above/below each paragraph
                        lineHeight: "1.5", // Space between lines
                    }}
                >
                    <strong>From:</strong> {callDetail.from}
                </p>
                <p
                    style={{
                        fontSize: "18px",
                        color: "#555",
                        margin: "5px 0",
                        lineHeight: "1.5",
                    }}
                >
                    <strong>To:</strong> {callDetail.to}
                </p>
                <p
                    style={{
                        fontSize: "18px",
                        color: "#555",
                        margin: "5px 0",
                        lineHeight: "1.5",
                    }}
                >
                    <strong>Duration:</strong> {convertSecondsToHHMMSS(callDetail.duration)}
                </p>
                <p
                    style={{
                        fontSize: "18px",
                        color: "#555",
                        margin: "5px 0",
                        lineHeight: "1.5",
                    }}
                >
                    <strong>Created At:</strong> {new Date(callDetail.created_at).toLocaleString()}
                </p>

            </div>


            <div style={{ display: 'flex', justifyContent: 'center', margin: "20px" }}>
                <button onClick={handleArchiveClick} className="backbutton" >
                    {(callDetail.is_archived)?"Undo":"Archive"}
                </button>
            </div>



        </div>)
}

export default CallDetail;