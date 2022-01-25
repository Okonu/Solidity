const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal"); //this will compile the contract and generate the necessary files nneded to work with the contract under the "artifacts" directory, check it after running this.
    const waveContract = await waveContractFactory.deploy(); //Here, hardhat will create a local Ethereum network, but just for this contract. And after the script completes it'll destroyb that local network. So every time you run the contract it will be a fresh blockchain. The point is, its like refreshing the local server every time so you always start from a clean slate which makes it easy to debug errors.
    await waveContract.deployed(); //we will wait untill the contract is actually deployed to our local blockchain. It means the "Constructor" actually run when we deploy.
    console.log("Contract deployed to:", waveContract.address); //"waveContract.address" will give the address of the deployed contract. The address is how we can actually find our contract on the blockchain 
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
