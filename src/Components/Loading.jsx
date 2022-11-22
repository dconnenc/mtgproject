import { InfinitySpin } from  'react-loader-spinner'


export const Loading = () => {
    return (
    <div className="center">
        <InfinitySpin 
        width='200'
        color="#FFFFFF"
        />
    </div>
    )
}
