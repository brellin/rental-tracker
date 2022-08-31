export default ({ contacted, scheduled, wanted, link }) => {
    return <tr>
        <td>{ contacted }</td>
        <td>{ scheduled }</td>
        <td>{ wanted }</td>
        <td>{ link }</td>
    </tr>;
};
