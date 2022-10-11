import { FC } from "react"
import ContentLoader from "react-content-loader"

const InmuebleCardGridPlaceholder: FC = (props: any) => (
    <ContentLoader
        speed={2}
        width={400}
        height={150}
        viewBox="0 0 400 150"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="47" y="8" rx="0" ry="0" width="95" height="73" />
        <rect x="48" y="92" rx="0" ry="0" width="38" height="9" />
        <rect x="49" y="114" rx="0" ry="0" width="94" height="8" />
        <rect x="49" y="134" rx="0" ry="0" width="94" height="8" />
        <rect x="99" y="93" rx="0" ry="0" width="45" height="9" />
    </ContentLoader>
)

export default InmuebleCardGridPlaceholder