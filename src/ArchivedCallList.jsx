import { useEffect, useState } from "react";
import { getAllCallActivities, resetCall } from "./Utils/Api";
import GlobalError from "./Utils/ErrorView";
import { Button, capitalize } from "@material-ui/core";
import ArchiveIcon from '@material-ui/icons/Archive';
import { Link } from "react-router-dom";
import { ReactComponent as CallInIcon } from './img/call_in.svg';
import { ReactComponent as CallOutIcon } from './img/call_out.svg';
import { ReactComponent as MissedCallIcon } from './img/missed_call.svg';
import { convertToTimeFormat } from "./Utils/Utils";


const ArchivedCallList = () => {


    const [error, setError] = useState(null);
    const [archivedcallDataList, setArchivedCallDataList] = useState({});


    const style = {
        marginLeft: 10,
        marginBottom: 5,
        textTransform: 'none'
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];

    };



    const removeDuplicates = (calls) => {
        const uniqueCalls = [];
        const seen = new Set();

        for (const call of calls) {
            const date = formatDate(call.created_at);
            const key = `${call.from}-${call.to}-${date}`;

            if (!seen.has(key)) {
                uniqueCalls.push(call);
                seen.add(key);
            }
        }

        return uniqueCalls;
    };

    const groupByDate = (calls) => {
        return calls.reduce((acc, call) => {
            const date = formatDate(call.created_at);
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(call);
            return acc;
        }, {});
    };


    const handleBtnClick = async () => {
        const resetData = await resetCall();
        callList();
    };


    const mergeConsecutiveCalls = (calls) => {
        const mergedCalls = [];
        for (let i = 0; i < calls.length; i++) {
            if (i === 0 || calls[i].from !== calls[i - 1].from || calls[i].to !== calls[i - 1].to) {
                mergedCalls.push(calls[i]);
            }
        }
        return mergedCalls;
    };

    const callList = async () => {
        try {
            const result = await getAllCallActivities();
            const uniqueCalls = removeDuplicates(result.filter(call => call.is_archived));
            console.log("list ", uniqueCalls.length);
            const grouped = groupByDate(uniqueCalls);

            for (let date in grouped) {
                grouped[date] = mergeConsecutiveCalls(grouped[date]);
                grouped[date].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            }
            const sortedGrouped = Object.fromEntries(
                Object.entries(grouped).sort(([a], [b]) => new Date(b) - new Date(a))
            );
            setArchivedCallDataList(sortedGrouped);
            setError(null);
        } catch (err) {
            setError("Error loading data");
        }
    };

    useEffect(() => {
       

        callList();
    }, []);

    if (error) return <GlobalError message={error} />;

    return (
        <div>

            <nav>
                <ul className="tabs">
                    <li>
                        <Link to="/">Active Call</Link>
                    </li>
                    <li>
                        <Link to="/ArchiveCall">Archive Call</Link>
                    </li>
                </ul>
            </nav>

            <Button
                variant="outlined"
                color="#03dac6"
                onClick={handleBtnClick}
                startIcon={<ArchiveIcon />}
                style={style}
            >
                Undo All Calls
            </Button>

            <ul className="list-container">
                {Object.keys(archivedcallDataList).length === 0 ? (
                    <li style={{ textAlign: 'center', padding: '20px', fontFamily: 'monospace' }}>
                        No calls available.
                    </li>
                ) :
                Object.keys(archivedcallDataList).map((date) => (
                    <div key={date} >
                        <h2 style={{ textAlign: 'center', fontSize: 14, padding: '10px 0px 15px 0px', fontFamily: 'monospace' }}>{date}</h2>
                        <ul  >
                            {archivedcallDataList[date].map((call, index) => (
                                <li key={index}>
                                    <Link to={`/call/${call.id}`} className="no-underline">
                                        <div className="list-item">
                                            <div className="left-side">
                                                {(call.call_type === "missed") ? <MissedCallIcon className="image" /> : ((call.call_type === "answered") && call.direction === "inbound") ? <CallInIcon className="image" /> : <CallOutIcon className="image" />}
                                                <div className="text-container">
                                                    <h1 style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{call.to}</h1>
                                                    <h2 style={{ fontFamily: 'monospace', fontWeight: 'lighter', marginTop: 8 }}>{call.duration}</h2>
                                                </div>
                                            </div>
                                            <div className="right-side">
                                                <h2>{convertToTimeFormat(call.created_at)}</h2>
                                            </div>
                                        </div>
                                    </Link>

                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </ul>

        </div>
    );

}
export default ArchivedCallList;