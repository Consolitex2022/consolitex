import { GetServerSideProps, NextPage } from 'next'

interface Props {

}

const InmueblePage: NextPage<Props> = () => {
    return (<></>)
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    return {
        props: {

        }
    }
}

export default InmueblePage;